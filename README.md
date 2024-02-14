# API-документация

<details>
  <summary><h2>POST</h2></summary>

<details>
<summary>
  <h3><code>/user/signUp</code> - регистрация (создание) нового пользователя.</h3>
</summary>
  Тело запроса должно содержать поля в формате JSON:
  <ul>
    <li><b><code>phone</code></b></li>
    <li><b><code>role</code></b></li>
    <li><b><code>displayName</code></b></li>
    <li><b><code>password</code></b></li>
  </ul>
   
   Возвращаемый ответ
   <code>
     {
        "success": true,
        "payload": {
            "phone": "7777777771",
            "role": "customer",
            "displayName": "Johathan Littel",
            "identifyingNumber": null,
            "status": "ACTIVE",
            "email": null,
            "avatar": null,
            "avgRating": null,
            "ratingCount": null,
            "lastPostition": null,
            "id": 18,
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Ijc3Nzc3Nzc3NzEiLCJyb2xlIjoicGVyZm9ybWVyIiwiYmlydGhkYXkiOiIyMDA0LTA0LTEwVDA0OjAwOjAwLjAwMFoiLCJkaXNwbGF5TmFtZSI6ItCY0LLQsNC9MmFzZ2FzZmFzYXNmIiwiaWRlbnRpZnlpbmdOdW1iZXIiOm51bGwsInN0YXR1cyI6IkFXQUlUSU5HIiwiZW1haWwiOm51bGwsImF2YXRhciI6bnVsbCwiYXZnUmF0aW5nIjpudWxsLCJyYXRpbmdDb3VudCI6bnVsbCwibGFzdFBvc3RpdGlvbiI6bnVsbCwiaWQiOjE4LCJpYXQiOjE3MDI1Nzc1MDksImV4cCI6MTcwMjY2MzkwOX0.VtPO3zEf_hL4_eiK2dFwrjsXvMRgrATede7mASnFtGQ",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Ijc3Nzc3Nzc3NzEiLCJyb2xlIjoicGVyZm9ybWVyIiwiYmlydGhkYXkiOiIyMDA0LTA0LTEwVDA0OjAwOjAwLjAwMFoiLCJkaXNwbGF5TmFtZSI6ItCY0LLQsNC9MmFzZ2FzZmFzYXNmIiwiaWRlbnRpZnlpbmdOdW1iZXIiOm51bGwsInN0YXR1cyI6IkFXQUlUSU5HIiwiZW1haWwiOm51bGwsImF2YXRhciI6bnVsbCwiYXZnUmF0aW5nIjpudWxsLCJyYXRpbmdDb3VudCI6bnVsbCwibGFzdFBvc3RpdGlvbiI6bnVsbCwiaWQiOjE4LCJpYXQiOjE3MDI1Nzc1MDksImV4cCI6MTcwNTE2OTUwOX0.lNhoA_pPi7zY2NRGinzSGST3ezDo6HHGT6Ty8r50zQA"
        }
    }
   </code>
   Если в качестве роли был выбран **performer**, то в теле запроса будет необходимо также отправить поле **birthday** и тогда ответ будет следующим
   <code>
     {
        "success": true,
        "payload": {
            "phone": "7777777771",
            "role": "performer",
            "birthday": "2004-04-10T04:00:00.000Z",
            "displayName": "Johathan Littel",
            "identifyingNumber": null,
            "status": "AWAITING",
            "email": null,
            "avatar": null,
            "avgRating": null,
            "ratingCount": null,
            "lastPostition": null,
            "id": 18,
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Ijc3Nzc3Nzc3NzEiLCJyb2xlIjoicGVyZm9ybWVyIiwiYmlydGhkYXkiOiIyMDA0LTA0LTEwVDA0OjAwOjAwLjAwMFoiLCJkaXNwbGF5TmFtZSI6ItCY0LLQsNC9MmFzZ2FzZmFzYXNmIiwiaWRlbnRpZnlpbmdOdW1iZXIiOm51bGwsInN0YXR1cyI6IkFXQUlUSU5HIiwiZW1haWwiOm51bGwsImF2YXRhciI6bnVsbCwiYXZnUmF0aW5nIjpudWxsLCJyYXRpbmdDb3VudCI6bnVsbCwibGFzdFBvc3RpdGlvbiI6bnVsbCwiaWQiOjE4LCJpYXQiOjE3MDI1Nzc1MDksImV4cCI6MTcwMjY2MzkwOX0.VtPO3zEf_hL4_eiK2dFwrjsXvMRgrATede7mASnFtGQ",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZSI6Ijc3Nzc3Nzc3NzEiLCJyb2xlIjoicGVyZm9ybWVyIiwiYmlydGhkYXkiOiIyMDA0LTA0LTEwVDA0OjAwOjAwLjAwMFoiLCJkaXNwbGF5TmFtZSI6ItCY0LLQsNC9MmFzZ2FzZmFzYXNmIiwiaWRlbnRpZnlpbmdOdW1iZXIiOm51bGwsInN0YXR1cyI6IkFXQUlUSU5HIiwiZW1haWwiOm51bGwsImF2YXRhciI6bnVsbCwiYXZnUmF0aW5nIjpudWxsLCJyYXRpbmdDb3VudCI6bnVsbCwibGFzdFBvc3RpdGlvbiI6bnVsbCwiaWQiOjE4LCJpYXQiOjE3MDI1Nzc1MDksImV4cCI6MTcwNTE2OTUwOX0.lNhoA_pPi7zY2NRGinzSGST3ezDo6HHGT6Ty8r50zQA"
        }
    }
   </code>
   Обратите внимание, что статус у пользователя **AWAITING**, что означает, что менеджеру нужно будет сначала проверить, что указанный возраст соответствует действительности, прежде чем переводить его в статус **ACTIVE**.
</details>

<details>
  <summary><h3><code>/user/signIn</code> - логин пользователя</h3></summary>
    
    Тело запроса должно содержать поля в формате JSON:
   <ul>
    <li><b><code>phone</code></b></li>
    <li><b><code>password</code></b></li>
   </ul>
     
  Возвращаемый ответ
   <code>
     {
        "success": true,
        "message": "You logged in",
        "payload": {
            "id": 3,
            "displayName": "Johathan Littel",
            "phone": "7973458315",
            "email": null,
            "avatar": null,
            "birthday": null,
            "role": "manager",
            "avgRating": null,
            "ratingCount": null,
            "lastPostition": null,
            "identifyingNumber": null,
            "status": "ACTIVE",
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzcGxheU5hbWUiOiJKb2hhdGhhbiBMaXR0ZWwiLCJwaG9uZSI6Ijc5NzM0NTgzMTUiLCJlbWFpbCI6bnVsbCwiYXZhdGFyIjpudWxsLCJiaXJ0aGRheSI6bnVsbCwicm9sZSI6Im1hbmFnZXIiLCJhdmdSYXRpbmciOm51bGwsInJhdGluZ0NvdW50IjpudWxsLCJsYXN0UG9zdGl0aW9uIjpudWxsLCJpZGVudGlmeWluZ051bWJlciI6bnVsbCwic3RhdHVzIjoiQUNUSVZFIiwiaWF0IjoxNzAyNTc3NDAwLCJleHAiOjE3MDI2NjM4MDB9.dExJ6FNSGj-5cTBYcevohjlQo3vNFlXIGqRCwecDIec",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZGlzcGxheU5hbWUiOiJKb2hhdGhhbiBMaXR0ZWwiLCJwaG9uZSI6Ijc5NzM0NTgzMTUiLCJlbWFpbCI6bnVsbCwiYXZhdGFyIjpudWxsLCJiaXJ0aGRheSI6bnVsbCwicm9sZSI6Im1hbmFnZXIiLCJhdmdSYXRpbmciOm51bGwsInJhdGluZ0NvdW50IjpudWxsLCJsYXN0UG9zdGl0aW9uIjpudWxsLCJpZGVudGlmeWluZ051bWJlciI6bnVsbCwic3RhdHVzIjoiQUNUSVZFIiwiaWF0IjoxNzAyNTc3NDAwLCJleHAiOjE3MDUxNjk0MDB9.3nR5jAB_oKqv8v6IxpO4Nnb_RNZ2CErQdco6l6H4DtY"
        }
    }
   </code>
   Если в БД будет найдено несколько записей с одним и тем же телефоном, но разными ролями, то ответ придет со списком пользователей, одного из которых нужно будет выбрать, используя запрос <b><code>/user/signInWithRole</code></b>
   <code>
     {
        "success": true,
        "message": "Choose your role",
        "payload": {
            "0": {
                "id": 6,
                "displayName": "Alfredo Reichert",
                "phone": "7107296254",
                "email": null,
                "avatar": null,
                "birthday": null,
                "role": "customer",
                "avgRating": null,
                "ratingCount": null,
                "lastPostition": null,
                "identifyingNumber": null,
                "status": "ACTIVE"
            },
            "1": {
                "id": 2,
                "displayName": "Alfredo Reichert",
                "phone": "7107296254",
                "email": "user@example.com",
                "avatar": null,
                "birthday": null,
                "role": "manager",
                "avgRating": null,
                "ratingCount": null,
                "lastPostition": null,
                "identifyingNumber": null,
                "status": "ACTIVE"
            },
            "2": {
                "id": 11,
                "displayName": "Alfredo Reichert",
                "phone": "7107296254",
                "email": null,
                "avatar": null,
                "birthday": null,
                "role": "performer",
                "avgRating": null,
                "ratingCount": null,
                "lastPostition": null,
                "identifyingNumber": null,
                "status": "ACTIVE"
            }
        }
     }
   </code>
</details>

<details>
  <summary><h3><code>/user/signInWithRole</code> - выбор роли под которым будет происходить логин пользователя, если он имеет несколько ролей, которые ему вернул сервер в ответ на <b><code>/user/signIn</code></b></h3></summary>

  Тело запроса должно содержать поля в формате JSON:
   <ul>
      <li><b><code>phone</code></b></li>
      <li><b><code>password</code></b></li>
      <li><b><code>role</code></b></li>
   </ul>
    
  Как и в случае c <b><code>/user/signIn</code></b>, при котором у пользователя в БД находится только одна роль придет ответ:
  ```
    {
        "success": true,
        "message": "You logged in",
        "payload": {
            "id": 2,
            "displayName": "Alfredo Reichert",
            "phone": "7107296254",
            "email": "user@example.com",
            "avatar": null,
            "birthday": null,
            "role": "manager",
            "avgRating": null,
            "ratingCount": null,
            "lastPostition": null,
            "identifyingNumber": null,
            "status": "ACTIVE",
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGlzcGxheU5hbWUiOiJBbGZyZWRvIFJlaWNoZXJ0IiwicGhvbmUiOiI3MTA3Mjk2MjU0IiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiYXZhdGFyIjpudWxsLCJiaXJ0aGRheSI6bnVsbCwicm9sZSI6Im1hbmFnZXIiLCJhdmdSYXRpbmciOm51bGwsInJhdGluZ0NvdW50IjpudWxsLCJsYXN0UG9zdGl0aW9uIjpudWxsLCJpZGVudGlmeWluZ051bWJlciI6bnVsbCwic3RhdHVzIjoiQUNUSVZFIiwiaWF0IjoxNzAyNTc5NTAxLCJleHAiOjE3MDI2NjU5MDF9.pj-aK-xIEjmJg044HVd-_hdlvlIF9IHzVJFOB2nKgYo",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGlzcGxheU5hbWUiOiJBbGZyZWRvIFJlaWNoZXJ0IiwicGhvbmUiOiI3MTA3Mjk2MjU0IiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiYXZhdGFyIjpudWxsLCJiaXJ0aGRheSI6bnVsbCwicm9sZSI6Im1hbmFnZXIiLCJhdmdSYXRpbmciOm51bGwsInJhdGluZ0NvdW50IjpudWxsLCJsYXN0UG9zdGl0aW9uIjpudWxsLCJpZGVudGlmeWluZ051bWJlciI6bnVsbCwic3RhdHVzIjoiQUNUSVZFIiwiaWF0IjoxNzAyNTc5NTAxLCJleHAiOjE3MDUxNzE1MDF9.Qi1s2PzZ52amosmgdqB_VH3sBidSKvqqmPyFTUb-BAs"
        }
    }
  ```
</details>

<details>
  <summary><h3><code>/user/signOut</code>  - разлогин пользователя</h3></summary>

  Возвращаемый ответ
  ```
  {
      success: true,
      message: 'You logged out'
  }
  ```
</details>

<details>
  <summary><h3><code>/user/addUser</code>  - добавление(создание) нового пользователя, права на использование данного роута есть только у администратора и менеджеров.</h3></summary>
  
Тело запроса должно содержать поля в формате JSON:
<ul>
   <li><b><code>phone</code></b></li>
   <li><b><code>role</code></b></li>
   <li><b><code>displayName</code></b></li>
   <li><b><code>birthday</code></b> (необязательное поле)</li>
   <li><b><code>identifyingNumber</code></b> (необязательное поле)</li>
</ul>

  Возвращаемый ответ
  ```
  {
      "success": true,
      "payload": {
          "phone": "7049454715",
          "displayName": "Test Testovich",
          "role": "customer",
          "birthday": null,
          "identifyingNumber": null,
          "email": null,
          "avatar": null,
          "avgRating": null,
          "ratingCount": null,
          "lastPosition": null,
          "id": 35,
          "status": "ACTIVE"
      }
  }
  ```
</details>

<details>
  <summary><h3><code>/order</code> - создает заказ.</h3>

  Тело запроса должно содержать поля в формате JSON:
  <ul>
   <li><b><code>customerId</code></b></li>
   <li><b><code>serviceId</code></b></li>
   <li><b><code>orderData</code></b></li>
   <li><b><code>address</code></b></li>
   <li><b><code>performersQuantity</code></b></li>
   <li><b><code>lat</code></b></li>
   <li><b><code>lng</code></b></li>
   <li><b><code>description</code></b></li>
   <li><b><code>managerId</code></b> (необязательное поле), на случай, если мы сразу хотим назначить менеджера</li>
   <li><b><code>phone</code></b> (необязательное поле), на случай если мы сразу создаем нового клиента</li>
   <li><b><code>displayName</code></b> (необязательное поле), на случай если мы сразу создаем нового клиента</li>
  </ul>

Возвращаемый ответ
```
{
    "address": "2222 тг, Аксай-2, дом 10, кв. 35",
    "customerId": 7,
    "serviceId": 1,
    "orderData": "2024-02-01T16:00:00.000Z",
    "performersQuantity": 5,
    "lat": 59,
    "lng": 45,
    "managerId": 5,
    "status": "SEARCHING",
    "description": "Некоторое описание заказа",
    "timeWorked": null,
    "income": null,
    "performerPayment": null,
    "tax": null,
    "profit": null,
    "managerCommentary": null,
    "id": 103,
    "createdAt": "2024-01-09T20:56:27.000Z"
}
```
</details>

<details>
  <summary><h3><code>/response</code> - создает отклик на заказ.</h3></summary>

  Запрос доступен для пользователей с ролью admin, manager и performer.

  Успешно отработает только если заказ находится в статусе **SEARCHING**. Для админа и менеджера отработает еще и в случае статуса "ON_MANAGER".

  Тело запроса должно содержать поля в формате JSON:

  <ul>
      <li><b><code>orderId</code></b></li>
      <li><b><code>performerId</code></b></li>
  </ul>

  Возвращаемый ответ
  ```
  {
      "orderId": 1,
      "performerId": 24,
      "status": "WAITING",
      "start": null,
      "end": null,
      "performerRating": null,
      "customerRating": null,
      "id": 188
  }
  ```
</details>
</details>

<details>
    <summary><h2>PATCH</h2></summary>
    <details>
        <summary><h3><code>/order/:id/edit</code> - редактирует заказ с указанным ID.</h3></summary>

  Тело запроса может содержать все те же поля что и при создании заказа кроме ID клиента, а также полей, формирующих нового клиента, т.е. <b>phone</b> и <b>displayName</b>.
   Возвращаемый ответ
      ```
      {
          "success": true,
          "message": "order successfully updated"
      }
      ```
      Измененный заказ не возвращается целиком, т.к. вы и сами знаете каким изменениям вы его подвергли со стороны фронта.

      На бэке же после обновления данных пришлось бы писать дополнительный запрос на получение обновленного заказа, что уже может сказаться на производительности. 
  </details>

  <details>
    <summary><h3><code>/response/:id/notifyArrival</code> - уведомление о прибытии исполнителя.</h3></summary>

  Запрос доступен для пользователей с ролью admin, manager и performer.

  По ID отклика устанавливает его статус в <b>AWAITING_CONFIRMATION_ARRIVAL</b>, т.е. уведомляет о прибытии исполнителя по адресу заказа.

  При успешном ответе нужно проставить вручную этот же статус для отлика со стороны фронта. Опять таки, не возвращаю весь отклик, чтобы не плодить запросы.

  Возвращаемый ответ
  ```
  {
      "success": true,
      "message": "Arrival notification sent."
  }
  ```
  </details>

  <details>
       <summary><h3><code>/response/:id/confirmArrival</code> - подтверждение факта прибытия исполнителя.</h3></summary>
  
  Запрос, доступен для пользователей с ролью admin, manager и customer.

  По ID отклика устанавливает его статус в <b>IN_PROGRESS</b>, параллельно проверяя статусы остальных участников, и если все остальные тоже имеют статус <b>IN_PROGRESS</b> записывает всем текущее время в поле <b>start</b>, а заказу присваивает статус <b>IN_PROGRESS</b>, знаменуя тем самым начало работ.

  Успешно отработает только в случае, если предыдущий статус был <b>AWAITING_CONFIRMATION_ARRIVAL</b>.

  При успешном ответе может вернуться два варианта ответа, в одном из них будет присутсвовать поле start, если оно есть - значит заказ был запущен в исполнение.

  Возвращаемый ответ
  ```
  {
      "success": true,
      "start": "2024-01-21T00:13:13.204Z"
      "message": "Arrival confirmed, the start of work has been recorded."
  }
  ```
  </details>


  <details>
      <summary><h3><code>/order/:id/confirmArrivalForAll</code> - подтверждение о прибытии всех исполнителей заказа.</h3></summary>

  Запрос доступен для пользователей с ролью admin, manager и customer.

  По ID заказа устанавливает статус откликов, у которых текущий статус <b>AWAITING_CONFIRM_ARRIVAL</b> в значение <b>IN_PROGRESS</b>.

  Если в ходе выполнения запроса становится ясно, что в результате все отклики будут иметь статус <b>IN_PROGRESS</b> записывает всем поле <b>start</b> и ставит статус заказа в <b>IN_PROGRESS</b>.

  Успешно отработает только в случае, если предыдущий статус заказа был <b>WAITING</b> или <b>ON_MANAGER</b>, а среди откликов был хотя бы один со статусом <b>AWAITING_CONFIRMATION_ARRIVAL</b>.

  При успешном ответе может вернуться два варианта ответа, в одном из них будет присутсвовать поле <b>start</b>, если оно есть - значит заказ был запущен в исполнение.

  Возвращаемый ответ
  ```
  {
      "success": true,
      "start": "2024-01-21T00:13:13.204Z"
      "message": "Arrival confirmed, the start of work has been recorded."
  }
  ```
  </details>

  <details>
      <summary><h3><code>/order/:id/start</code> - подтверждение о прибытии всех исполнителей заказа.</h3></summary>

  Единственное отличие от <b><code>/order/:id/confirmArrivalForAll</code></b> в том, что во-первых данный запрос доступен только для менеджера, а во вторых при смене статуса откликов будет сразу записывать start, а заказ ставится в <b>IN_PROGRESS</b>, не ожидая уведомления о прибытии от остальных исполнителей, что приведет к тому, что у разных откликов будет записано разное время старта работ.

  Возвращаемый ответ
  ```
  {
      "success": true,
      "start": "2024-01-21T00:13:13.204Z"
      "message": "Arrival confirmed, the start of work has been recorded."
  }
  ```
  </details>

  <details>
      <summary><h3><code>/response/:id/notifyCompletion</code> - уведомление о завершении работ исполнителем.</h3></summary>

  Запрос доступен для пользователей с ролью admin, manager и performer. По ID отклика устанавливает его статус в **AWAITING_CONFIRMATION_COMPLETION**, т.е. уведомляет обокончании работ исполнителем.

  При успешном ответе нужно проставить вручную этот же статус для отлика со стороны фронта. Опять таки, не возвращаю весь отклик, чтобы не плодить запросы.

  Возвращаемый ответ
  ```
  {
      "success": true,
      "message": "Completion notification sent."
  }
  ```
  </details>

  <details>
      <summary><h3><code>/response/:id/confirmCompletion</code> - подтверждение факта завершения работ исполнителем.</h3></summary>

  Запрос, доступен для пользователей с ролью admin, manager и customer.

  По ID отклика устанавливает его статус в <b>DONE</b>, параллельно проверяя статусы остальных участников, и если все остальные тоже имеют статус <b>DONE</b> записывает всем текущее время в поле <b>end</b>, а заказу присваивает статус <b>REQUIRES_PAYMENT</b>, знаменуя тем самым окончание работ.

  Успешно отработает только в случае, если предыдущий статус был <b>AWAITING_CONFIRMATION_СOMPLETION</b>.

  При успешном ответе может вернуться два варианта ответа, в одном из них будет присутсвовать поле <b>end</b>, если оно есть - значит исполнение заказа было завершено, а он сам переведен в статус ожидания оплаты.

  Возвращаемый ответ
  ```
  {
      "success": true,
      "end": "2024-01-21T00:40:23.532Z"
      "message": "Completion confirmed, end of work has been recorded."
  }
  ```
  </details>

  <details>
      <summary><h3><code>/order/:id/confirmCompletionForAll</code> - подтверждение о завершении работ всех исполнителей.</h3></summary>

  Запрос доступен для пользователей с ролью admin, manager и customer. Предназначен, в первую очередь, для клиентов, т.к. они могут подтверждать окончание работ исполнителей только когда они все уже уведомили о завершении.

  По ID заказа устанавливает статус его откликов в <b>DONE</b>, а текущее время записывается в поле <b>end</b> сразу для всех исполнителей.

  Также устанавливает статус самого заказа в <b>REQUIRES_PAYMENT</b>.

  Успешно отработает только в случае, если предыдущий статус заказа был <b>IN_PROGRESS</b>, а у всех откликов был статус **AWAITING_CONFIRMATION_COMPLETION**.

  Возвращаемый ответ
  ```
  {
      "success": true,
      "end": "2024-01-21T00:40:23.532Z"
      "message": "Completions confirmed, end of work has been recorded."
  }
  ```
  </details>

  <details>
      <summary><h3><code>/order/:id/end</code> - подтверждение о завершении работ всех исполнителей.</h3></summary>

  Единственное отличие от <b><code>/order/:id/confirmCompletionForAll</code></b> в том, что во-первых данный запрос доступен только для менеджера, а во вторых при смене статуса откликов будет сразу записывать <b>end</b>, а заказ ставится в <b>REQUIRES_PAYMENT</b>, не ожидая уведомления об окончании работ от остальных исполнителей, <b>end</b> запиывается также тем, у кого статус стоит <b>IN_PROGRESS</b>.

  Возвращаемый ответ
  ```
  {
      "success": true,
      "end": "2024-01-21T00:13:13.204Z"
      "message": "Arrival confirmed, the start of work has been recorded."
  }
  ```
  </details>


  <details>
      <summary><h3><code>/response/:id/block</code> - блокировка исполнителя в заказе.</summary>

  Запрос доступен только для пользователей с ролью admin и manager. По ID отклика ставит его статус в значение **BANNED**, тем самым навсегда исключая возможность повторного отклика со стороны исполнителя на данный заказ.

  Если запрос был вызван во время статуса отклика <b>IN_PROGRESS</b>, то в поле end записывается время окончания работ.

  Возвращаемый ответ
  ```
  {
      "success": true,
      "message": "The performer is suspended from participating in the order."
  }
  ```
  </details>

  <details>
      <summary><h3><code>/order/:id/close</code> - закрытие заказа.</summary>

  Запрос доступен только для пользователей с ролью admin и manager. По ID заказа ставит его статус в значение <b>DONE</b>.

  Успешно отработает только в том случае, если предыдущий статус был в значении <b>REQUIRES_PAYMENT</b>;

  Возвращаемый ответ
  ```
  {
      "success": true,
      "message": "The order is closed."
  }
  ```
  </details>

  <details>
      <summary><h3><code>/order/:id/cancel</code> - отмена заказа.</h3></summary>

  Запрос доступен для пользователей с ролью admin, manager и customer. По ID заказа ставит его статус в значение **CANCELED**.

  Успешно отработает только в том случае, если до начала заказа осталось больше часа;

  Возвращаемый ответ
  ```
  {
      "success": true,
      "message": "The order is canceled."
  }
  ```
  </details>
</details>

<details>
  <summary><h2>DELETE</h2></summary>
  <details>
      <summary><h3><code>/response/:id</code> - отмена отклика.</h3></summary>

  Запрос доступен для пользователей с ролью admin, manager и performer. Предназначен, в первую очередь для исполнителей, чтобы они имели возможность отменить свое участие в заказе.

  Полностью удаляет отклик из базы данных. Успешно отработает только в том случае, если до начала заказа осталось больше часа;

  Возвращаемый ответ
  ```
  {
      "success": true,
      "message": "The response has been successfully deleted."
  }
  ```
  </details>
</details>


<details>
  <summary><h2>GET</h2></summary>
  <details>
      <summary><h3><code>/user</code> - возвращает список пользователей.</h3></summary>

  Доступно только для авторизованного пользователя с ролью admin или manager.

  Доступные на данный момент query-параметры:
  <ul>
      <li><b><code>displayName</code></b> - ведет поиск по указанной части имени, например ```/user?displayName=leonardo jakubowski``` или даже ```/user?displayName=rdo jak```,</li>
      <li><b><code>phone</code></b> - ведет поиск по указанной части телефона, например ```/user?phone=7103895429``` или ```/user?phone=389```,</li>
      <li><b><code>email</code></b> - ведет поиск по указанной части Email, например ```/user?email=user@example.com``` или ```/user?email=example```,</li>
      <li><b><code>identifyingNumber</code></b> - ведет поиск по указанной части БИН/ИИН, например ```/user?identifyingNumber=760724300757``` или ```/user?identifyingNumber=72430```,</li>
      <li><b><code>role</code></b> - фильтрует список по роли пользователя, например ```/user?role=manager``` или ```/user?role=customer```,</li>
      <li><b><code>status</code></b> - фильтрует список по статусу пользователя, например ```/user?status=ACTIVE``` или ```/user?status=BLOCKED```,</li>
      <li><b><code>offset</code></b> - указывает количество пропущенных записей, например ```/user?offset=10``` пропустит первые 10 записей и вернет список, начиная с 11 позиции,</li>
      <li><b><code>limit</code></b> - указывает максимальное количество записей, которое будет отображаться на одной странице,</li>
      <li><b><code>sortBy</code></b> - указывает по какому полю будет производится сортировка, работает в обязательной связке с **sortOrder**, например ```/user?sortBy=avgRating&sortOrder=ASC```,</li>
      <li><b><code>sortOrder</code></b> - указывает порядок сортировки, возможные варианты значений только ```ASC``` или ```DESC```, работает в обязательной связке с **sortBy**.</li>
  </ul>
  Комбинация **offset** и **limit** отвечает за функционал пагинации, например ```/user?offset=30&limit=15``` является ссылкой на третью страницу, т.к. первые две страницы по 15 записей были пропущены.
  
  По умолчанию, если эти параметры пагинации не были отправлены, то **offset** принимает значение 0, а **limit** значение 20.
  
  Параметры можно комбинировать между собой и даже перечислить все сразу в одном запросе

  ```/user?phone=7103895429&email=user@example<area>.com&role=manager&status=ACTIVE&offset=18&limit=6```

  Пример формата в котором придет информация при запросе ```user?role=manager&status=ACTIVE&offset=2&limit=2```:
  ```
      {
          "users": [
              {
                  "id": 4,
                  "displayName": "Sylvia Wintheiser",
                  "phone": "7370776225",
                  "email": null,
                  "password": "$2b$10$HaUbtGKwzsIlJUsDlYd6aewY8AO7/.zaAkBXi/RXCbuBWFQWOiCKa",
                  "avatar": null,
                  "birthday": null,
                  "role": "manager",
                  "avgRating": null,
                  "ratingCount": null,
                  "lastPostition": null,
                  "identifyingNumber": null,
                  "status": "ACTIVE"
              },
              {
                  "id": 5,
                  "displayName": "Hal Blanda",
                  "phone": "7254444729",
                  "email": null,
                  "password": "$2b$10$Nu1O6b8RPki2nVkaQML2Le0dhnTO.HTFetIPbs4KONlz66lg6Faf6",
                  "avatar": null,
                  "birthday": null,
                  "role": "manager",
                  "avgRating": null,
                  "ratingCount": null,
                  "lastPostition": null,
                  "identifyingNumber": null,
                  "status": "ACTIVE"
              }
          ],
          "totalItems": 4,
          "totalPages": 2,
          "links": {
              "next": null,
              "prev": "/user?role=manager&status=ACTIVEoffset=0&limit=2",
              "first": "/user?role=manager&status=ACTIVEoffset=0&limit=2",
              "last": "/user?role=manager&status=ACTIVEoffset=2&limit=2",
              "page1": "/user?role=manager&status=ACTIVEoffset=0&limit=2",
              "page2": "/user?role=manager&status=ACTIVEoffset=2&limit=2"
          }
      }
  ```
  </details>

  <details>
      <summary><h3><code>/user/profile</code> - возвращает данные о текущем залогиненном пользователе.</h3></summary>

  Данные определяются по <b>accessToken</b>, который со стороны фронта отправляется по умолчанию в заголовках всех запросов через interceptor.
  </details>

  <details>
      <summary><h3><code>/user/:id</code> - возвращает информацию о конкретном пользователе.</h3></summary>

  По сути отрабатывает как сочетание query-параметров phone и role, которые тоже возвращают один результат, но с присущими <b><code>/user</code></b> - запросу полями <b>users</b>, <b>totalItems</b>, <b>totalPages</b> и <b>links</b>.

  Формат вывода:
  ```
      {
      "id": 2,
      "displayName": "Alfredo Reichert",
      "phone": "7107296254",
      "email": "user@example.com",
      "avatar": null,
      "birthday": null,
      "role": "manager",
      "avgRating": null,
      "ratingCount": null,
      "lastPostition": null,
      "identifyingNumber": null,
      "status": "ACTIVE"
      }
  ```
  </details>

  <details>
      <summary><h3><code>/user/refresh</code> - обновляет access и refresh токены, и тем самым продлевает сессию.</h3></summary>

  Отработает корректно, если refresh токен не истек. На стороне клиента используется на уровне интерцепторов.

  Возвращаемый ответ
  ```
  {
      "success": true,
      "message": "Tokens refreshed",
      "payload": {
          "id": 2,
          "displayName": "Alfredo Reichert",
          "phone": "7107296254",
          "email": "user@example.com",
          "avatar": null,
          "birthday": null,
          "role": "manager",
          "avgRating": null,
          "ratingCount": null,
          "lastPostition": null,
          "identifyingNumber": null,
          "status": "ACTIVE",
          "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGlzcGxheU5hbWUiOiJBbGZyZWRvIFJlaWNoZXJ0IiwicGhvbmUiOiI3MTA3Mjk2MjU0IiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiYXZhdGFyIjpudWxsLCJiaXJ0aGRheSI6bnVsbCwicm9sZSI6Im1hbmFnZXIiLCJhdmdSYXRpbmciOm51bGwsInJhdGluZ0NvdW50IjpudWxsLCJsYXN0UG9zdGl0aW9uIjpudWxsLCJpZGVudGlmeWluZ051bWJlciI6bnVsbCwic3RhdHVzIjoiQUNUSVZFIiwiaWF0IjoxNzAyNTc5OTExLCJleHAiOjE3MDI2NjYzMTF9.4vWURemIPMstusQ0lsbyyWIaoZboshVDC7w1-SKmEpY",
          "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZGlzcGxheU5hbWUiOiJBbGZyZWRvIFJlaWNoZXJ0IiwicGhvbmUiOiI3MTA3Mjk2MjU0IiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiYXZhdGFyIjpudWxsLCJiaXJ0aGRheSI6bnVsbCwicm9sZSI6Im1hbmFnZXIiLCJhdmdSYXRpbmciOm51bGwsInJhdGluZ0NvdW50IjpudWxsLCJsYXN0UG9zdGl0aW9uIjpudWxsLCJpZGVudGlmeWluZ051bWJlciI6bnVsbCwic3RhdHVzIjoiQUNUSVZFIiwiaWF0IjoxNzAyNTc5OTExLCJleHAiOjE3MDUxNzE5MTF9.unxkpZ9yPRSomrNMvFjNz3L_qoj5hxfR1H03PsR9Pxo"
      }
  }
  ```
  </details>

  <details>
      <summary><h3><code>/user/export-csv</code> - выгружает список пользователей в файл в формате .csv</h3></summary>
  </details>

  <details>
      <summary><h3><code>/order</code> - возвращает все заказы. Доступно для любого авторизованного пользователя.</h3></summary>

  Доступные на данный момент query-параметры:
  <ul>
      <li><b><code>service</code></b> - фильтрует список по ID сервиса(категории), например <code>/order?service=1</code>. Тут у на всего два возможных варианта - это либо 1(Грузчик), либо 2(Грузовой транспорт),</li>
      <li><b><code>manager</code></b> - фильтрует список по ID менеджера, например /code>/order?manager=2</code>,</li>
      <li><b><code>customer</code></b> - фильтрует список по ID заказчика, например <code>/order?customer=6</code>,</li>
      <li><b><code>status</code></b> - фильтрует список по статусу заказа, например <code>/order?status=SEARCHING</code> или <code>user?status=CANCELED</code></li>
      <li><b><code>offset</code></b> - указывает количество пропущенных записей, например <code>/order?offset=10</code> пропустит первые 10 записей и вернет список, начиная с 11 позиции</li>
      <li><b><code>limit</code></b> - указывает максимальное количество записей, которое будет отображаться на одной странице,</li>
      <li><b><code>sortBy</code></b> - указывает по какому полю будет производится сортировка, работает в обязательной связке с **sortOrder**, например <code>/order?sortBy=performersQuantity&sortOrder=ASC</code></li>
      <li><b><code>sortOrder</code></b> - указывает порядок сортировки, возможные варианты значений только <code>ASC</code> или <code>DESC</code> работает в обязательной связке с **sortBy**.</li>
  </ul>

  Комбинация <b>offset</b> и <b>limit</b> отвечает за функционал пагинации, например <code>/order?offset=30&limit=15</code> является ссылкой на третью страницу, т.к. первые две страницы по 15 записей были пропущены.

  По умолчанию, если эти параметры пагинации не были отправлены, то <b>offset</b> принимает значение 0, а <b>limit</b> значение 20.

  Параметры можно комбинировать между собой и даже перечислить все сразу в одном запросе

  <code>/order?service=1&manager=2&customer=6&status=IN_PROGRESS&offset=18&limit=6</code>

  Как можно заметить <b>offset</b> и <b>limit</b> являются универсальными параметрами и одинаково отрабатывают как на списках пользователей, так и на списках заказов.
  
  Пример формата в котором придет информация, при запросе <code>`order?service=2&manager=3&offset=2&limit=2</code>
        ```
          {
            "orders": [
                {
                    "id": 59,
                    "customerId": 7,
                    "serviceId": 2,
                    "orderData": "2024-01-16T23:50:56.000Z",
                    "address": "24928 Blair Lock",
                    "performersQuantity": 11,
                    "lat": -4,
                    "lng": 23,
                    "managerId": 3,
                    "status": "REQUIRES_PAYMENT",
                    "performerOrdersCount": 0
                },
                {
                    "id": 93,
                    "customerId": 6,
                    "serviceId": 2,
                    "orderData": "2023-12-29T23:50:56.000Z",
                    "address": "5265 Treutel Plain",
                    "performersQuantity": 16,
                    "lat": 14,
                    "lng": -82,
                    "managerId": 3,
                    "status": "IN_PROGRESS",
                    "performerOrdersCount": 12
                }
            ],
            "totalItems": 4,
            "totalPages": 2,
            "links": {
                "next": null,
                "prev": "/order?service=2&manager=3&sortOrder=ASC&offset=0&limit=2",
                "first": "/order?service=2&manager=3&sortOrder=ASC&offset=0&limit=2",
                "last": "/order?service=2&manager=3&sortOrder=ASC&offset=2&limit=2",
                "page1": "/order?service=2&manager=3&sortOrder=ASC&offset=0&limit=2",
                "page2": "/order?service=2&manager=3&sortOrder=ASC&offset=2&limit=2"
            }
          }
        ```
  </details>

  <details>
      <summary><h3><code>/order/:id</code> - возвращает информацию о конкретном заказе.</h3></summary>

  Формат вывода:
    ```
        {
        "id": 5,
        "customerId": 6,
        "serviceId": 1,
        "createdAt": "2023-12-13T15:14:00.000Z",
        "orderData": "2024-01-11T15:14:01.000Z",
        "address": "11938 Hermann Ranch",
        "description": null,
        "performersQuantity": 8,
        "timeWorked": null,
        "income": null,
        "performerPayment": null,
        "tax": null,
        "profit": null,
        "lat": -34,
        "lng": -35,
        "managerId": 3,
        "managerCommentary": null,
        "status": "IN_PROGRESS"
        }
    ```
  </details>

  <details>
      <summary><h3><code>/order/export-csv</code> - выгружает список заказов в файл в формате .csv</h3></summary>
  </details>
</details>


## Запуск фикстур

Прописать в корневой директории проекта
```
npm run seed
```