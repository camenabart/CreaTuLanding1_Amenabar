# El Tineo - E-commerce React

## Descripción
Proyecto de e-commerce desarrollado con React para la tienda "El Tineo" especializada en vinos y licores.

## Entrega 1: Crea tu Landing

### Componentes Creados

#### 1. NavBar
- **Ubicación**: `src/components/NavBar.js`
- **Funcionalidad**: Barra de navegación principal que incluye:
  - Logo de la tienda
  - Enlaces de navegación (Inicio, Vinos, Licores, Ofertas, Contacto)
  - Widget del carrito de compras (CartWidget)

#### 2. CartWidget
- **Ubicación**: `src/components/CartWidget.js`
- **Funcionalidad**: Widget del carrito de compras que muestra:
  - Ícono de carrito de compras
  - Contador de items (actualmente en 0)
- **Renderizado en**: NavBar

#### 3. ItemListContainer
- **Ubicación**: `src/components/ItemListContainer.js`
- **Funcionalidad**: Contenedor principal que:
  - Recibe props para personalizar el mensaje de bienvenida
  - Muestra información sobre la tienda
  - Preparado para mostrar el catálogo de productos en el futuro
- **Props utilizadas**: `greeting` (string con mensaje de bienvenida)

### Estructura del Proyecto
```
src/
├── components/
│   ├── NavBar.js
│   ├── NavBar.css
│   ├── CartWidget.js
│   ├── CartWidget.css
│   ├── ItemListContainer.js
│   └── ItemListContainer.css
├── App.js
├── App.css
├── index.js
└── index.css
```

### Características Implementadas
- ✅ Componentes de React funcionales
- ✅ Uso de props para comunicación entre componentes
- ✅ Estilos CSS personalizados
- ✅ Diseño responsive
- ✅ Integración de Font Awesome para íconos
- ✅ Logo de la tienda integrado

### Cómo Ejecutar el Proyecto

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm start
```

3. Abrir [http://localhost:3000](http://localhost:3000) en el navegador

### Tecnologías Utilizadas
- React 18.2.0
- React DOM 18.2.0
- React Scripts 5.0.1
- Font Awesome 6.0.0
- CSS3

### Autor
Catalina Amenabar

### Repositorio
https://github.com/camenabart/eltineo
