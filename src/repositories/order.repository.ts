import { Repository } from 'typeorm';
import { appDataSource } from '@/dataSource';
import { Order } from '@/entities/order.entity';
import { IOrder } from '@/interfaces/IOrder.interface';
import { EOrderStatus } from '@/enum/EOrderStatus.enum';
import { OrderDto } from '@/dto/order.dto';
import { IOrderList } from '@/interfaces/IList.interface';
import { IGetOrderParams } from '@/interfaces/IGetParams';
import { getLinks } from '@/helpers/getLinks';
import { EditOrderDto } from '@/dto/editOrder.dto';

export class OrderRepository extends Repository<Order> {
    constructor() {
        super(Order, appDataSource.createEntityManager());
    }

    async getOrders(params: IGetOrderParams): Promise<IOrderList> {
        const {
            offset,
            limit,
            service,
            manager,
            customer,
            performer,
            status,
            sortBy,
            sortOrder
        } = params;

        const queryBuilder = this.createQueryBuilder("order")
            .select([
                'order.id',
                'order.customerId',
                'order.serviceId',
                'order.orderData',
                'order.address',
                'order.performersQuantity',
                'order.lat',
                'order.lng',
                'order.managerId',
                'order.status'
            ])
            .leftJoin('order.responses', 'response')
            .loadRelationCountAndMap(
                'order.responsesCount',
                'order.responses',
                'response',
                (qb) => qb.where('response.status != :status', { status: 'BANNED' })
            );

        if (service) {
            queryBuilder.andWhere("order.serviceId = :service", { service });
        }

        if (manager) {
            queryBuilder.andWhere("order.managerId = :manager", { manager });
        }

        if (customer) {
            queryBuilder.andWhere("order.customerId = :customer", { customer });
        }

        if (performer) {
            queryBuilder.andWhere('response.performerId = :performer', { performer });
        }

        if (status) {
            console.log(status);
            queryBuilder.andWhere("order.status = :status", { status });
        }

        if (sortBy && sortOrder) {
            if (sortBy === 'manager' || sortBy === 'customer' || sortBy === 'performer') {
                queryBuilder.orderBy(`${sortBy}.displayName`, sortOrder);
            } else {
                queryBuilder.orderBy(`order.${sortBy}`, sortOrder);
            }
        }

        const totalItems = await queryBuilder.getCount();
        const orders = await queryBuilder.skip(offset).take(limit).getMany();
        const links = getLinks({ ...params, totalItems }, 'order');

        return { orders, totalItems, totalPages: Math.ceil(totalItems / limit), links };
    }

    async getOrderById(id: number): Promise<IOrder | null> {
        const order = await this.createQueryBuilder('order')
            .leftJoinAndSelect('order.service', 'service')
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('order.manager', 'manager')
            .leftJoinAndSelect('order.responses', 'response')
            .leftJoinAndSelect('response.performer', 'performer')
            .where("order.id = :id", { id })
            .getOne();

        return order;
    }

    async getOrderByResponseId(id: number): Promise<Order | null> {
        const order = await this.createQueryBuilder('order')
            .where(qb => {
                const subQuery = qb.subQuery()
                    .select('response.orderId')
                    .from('response', 'response')
                    .where('response.id = :id', { id })
                    .getQuery();
                return 'order.id IN ' + subQuery;
            })
            .leftJoinAndSelect('order.responses', 'response')
            .getOne();
        return order;
    }

    async getOrdersCSV(): Promise<Order[]> {
        const orders = await this.createQueryBuilder('order')
            .leftJoinAndSelect('order.service', 'service')
            .leftJoinAndSelect('order.customer', 'customer')
            .leftJoinAndSelect('order.manager', 'manager')
            .leftJoinAndSelect('order.responses', 'response')
            .leftJoinAndSelect('response.performer', 'performer')
            .getMany();
        return orders;
    }

    async createOrder(data: OrderDto): Promise<IOrder> {
        const order = new Order();
        order.address = data.address;
        order.customerId = data.customerId;
        order.serviceId = data.serviceId
        order.orderData = data.orderData;
        order.performersQuantity = data.performersQuantity;
        order.lat = data.lat;
        order.lng = data.lng;
        order.managerId = data.managerId;
        order.status = EOrderStatus.SEARCHING;
        order.description = data.description;
        const savedOrder = await this.save(order);
        return savedOrder;
    }

    async editOrder(data: EditOrderDto): Promise<boolean> {
        const editedOrder = await this.update(
            { id: data.id },
            {
                address: data.address,
                serviceId: data.serviceId,
                performersQuantity: data.performersQuantity,
                lat: data.lat,
                lng: data.lng,
                managerId: data.managerId,
                status: data.status,
                description: data.description
            });
        return (editedOrder.affected && editedOrder.affected > 0) as boolean;
    }
}
