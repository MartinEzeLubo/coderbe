**Documentacion API**
----
  
* **URL**

  http://localhost:8080/productos

* **Method:**
  
  `GET`
  
*  **Parametros**
    Se aceptan los siguientes parametros opcionales:
    - id: String
    - name: String
    - rangeFrom: Number
    - rangeTo: Number

    La busqueda es por orden de prioridad, en caso de enviar un ID busca el producto por ese valor, luego, en caso de enviarlo, busca por el nombre. Finalmente en caso de no poner ni "ID" ni "Nombre", busca por los rangos de precio

* **Respuesta exitosa:**
  
    * **Code:** 200 <br />
    **Content:** `{
                  "_id": "6069c4b60a68117f0bc5ea2a",
                  "nombre": "Test de post",
                  "descripcion": "sarasa",
                  "precio": 44999,
                  "codigo": "100002",
                  "stock": 12,
                  "foto": "https://garmin.com.ar/Image/0/450_450-010-01689-03_1.jpg",
                  "timestamp": 1617544374740,
                  "__v": 0
              },
                    `
 
* **Respuesta error:**

  * **Code:** 404 <br />
    **Content:** `No existe un producto con los valores buscados`
  
  * **Code:** 500 <br />
    **Content:** `{ 'Error de la aplicacion' + error }`




* **Method:**
  
    `POST`
  
*  **URL Params**

    No se requiere enviar ningun parametro

* **Data Params**

  ```JSON
    {
    "nombre": "Test de post",
    "descripcion": "sarasa",
    "precio": 44999,
    "codigo": "100002",
    "stock": 12,
    "foto": "https://garmin.com.ar/Image/0/450_450-010-01689-03_1.jpg"
    }
  ```

* **Success Response:**
    * **Code:** 201 Created<br />
    **Content:**
      ```JSON
          {
          "nombre": "Test de post",
          "descripcion": "sarasa",
          "precio": 44999,
          "codigo": "100002",
          "stock": 12,
          "foto": "https://garmin.com.ar/Image/0/450_450-010-01689-03_1.jpg"
          }
        ```


* **Error Response:**


  * **Code:** 400 Bad Request <br />
    **Content:** `{ "Los parametros enviados son incorrectos" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ Error de la aplicacion" }`




* **Method:**
  
    `DELETE`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Success Response:**
   
    * **Code:** 200 <br />
    **Content:** 
    ```JSON
          {
          "nombre": "Test de post",
          "descripcion": "sarasa",
          "precio": 44999,
          "codigo": "100002",
          "stock": 12,
          "foto": "https://garmin.com.ar/Image/0/450_450-010-01689-03_1.jpg"
          }
        ```
        
* **Error Response:**


  * **Code:** 404 Not Found <br />
    **Content:** `{ "Producto no encontrado" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ Error de la aplicacion" }`

 
 * **Method:**
  
    `PUT`
  
*  **URL Params**

    No se requiere enviar ningun parametro

* **Data Params**

 ```JSON
          {
          "nombre": "Test de post",
          "descripcion": "sarasa",
          "precio": 44999,
          "codigo": "100002",
          "stock": 12,
          "foto": "https://garmin.com.ar/Image/0/450_450-010-01689-03_1.jpg"
          }
```

* **Success Response:**
    * **Code:** 200 <br />
    **Content:** 
    ```JSON
          {
          "nombre": "Test de post",
          "descripcion": "sarasa",
          "precio": 44999,
          "codigo": "100002",
          "stock": 12,
          "foto": "https://garmin.com.ar/Image/0/450_450-010-01689-03_1.jpg"
          }
        ```
   
 
* **Error Response:**


  * **Code:** 400 Bad Request <br />
    **Content:** `{ "Los parametros enviados son incorrectos" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ Error de la aplicacion" }`
