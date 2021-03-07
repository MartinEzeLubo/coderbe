**Documentacion URLs**

* **URL**
    http://localhost:8080/
* **Respuesta:**
    Muestra el formulario de alta de productos y el listado de los productos actuales

* **URL**
    http://localhost:8080/productos/vista
* **Respuesta:**
    Muestra el listado de productos guardados

* **URL**
    http://localhost:8080/productos/alta
* **Respuesta:**
    Muestra el formulario de alta de productos

**Documentacion API**
----
  
* **URL**

  http://localhost:8080/api/productos

* **Method:**
  
  `GET`
  
*  **Parametros**
    No se requiere enviar ningun parametro

* **Respuesta exitosa:**
  
    * **Code:** 200 <br />
    **Content:** `{ id : 9 ,
                    title: 'Reloj con GPS',
                    price: 10000,
                    thumbnail: 'https://urlalaimagenquecorresponde.com.ar/imagen.jpg'
                    },
                    `
 
* **Respuesta error:**

  
  * **Code:** 500 <br />
    **Content:** `{ 'Error de la aplicacion' + error }`




* **Method:**
  
    `POST`
  
*  **URL Params**

    No se requiere enviar ningun parametro

* **Data Params**

  ```JSON
    {
    "title": "sarasa",
    "price": 28839,
    "thumbnail": "www.sarasa.com"
    }
  ```

* **Success Response:**
    redirige al formulario de alta de productos
 
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
    **Content:** `{ id : 9 ,
                    title: 'Reloj con GPS',
                    price: 10000,
                    thumbnail: 'https://urlalaimagenquecorresponde.com.ar/imagen.jpg'
                    },
                    ` 
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

  ```x-www-form-urlencoded
    {
    "title": "sarasa",
    "price": 28839,
    "thumbnail": "www.sarasa.com"
    }
  ```

* **Success Response:**
    redirige al formulario de alta de productos
 
* **Error Response:**


  * **Code:** 400 Bad Request <br />
    **Content:** `{ "Los parametros enviados son incorrectos" }`

  OR

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ Error de la aplicacion" }`
