

export const registerFormControls = [
    {
        name: 'userName',
        label: 'Username',
        placeholder: 'Enter your username',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password',
    }
];

export const loginFormControls = [
    {
      name: "email",
      label: "Email",
      placeholder: "Enter you email",
      componentType: "input",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "Enter your password",
      componentType: "input",
      type: "password",
    },
  ];

export const forgotPasswordFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
];

export const resetPasswordFormControls = [
  {
    name: "password",
    label: "New Password",
    placeholder: "Enter new password",
    componentType: "input",
    type: "password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm new password",
    componentType: "input",
    type: "password",
  },
];
  
  
  export const addProductFormElements = [
    {
      label: "Products",
      name: "title",
      componentType: "input",
      type: "text",
      placeholder: "Enter the Product Name",
    },
    {
      label: "Descripcion",
      name: "description",
      componentType: "textarea",
      placeholder: "Product Description",
    },
    {
      label: "Category",
      name: "category",
      componentType: "select",
      options: [
        { id: "earbuds", label: "Earbuds" },
        { id: "earphones", label: "Earphones" },
        { id: "watches", label: "Watches" },
        { id: "soundbars", label: "Soundbars" },
        { id: "headsets", label: "Headsets" },
        { id: "speakers", label: "Speakers" },
      ],
    },
    {
      label: "Brands",
      name: "brand",
      componentType: "select",
      options: [
        { id: "ultima", label: "Ultima" },
        { id: "boat", label: "Boat" },
        { id: "jbl", label: "JBL" },
        { id: "kick", label: "Kick" },
        { id: "gravity", label: "Gravity" }, 
      ],
    },
    {
      label: "Price",
      name: "price",
      componentType: "input",
      type: "number",
      placeholder: "Product Price",
    },
    {
      label: "Selling Price",
      name: "salePrice",
      componentType: "input",
      type: "number",
      placeholder: "Selling Price (optional)",
    },
    {
      label: "Total Stock",
      name: "totalStock",
      componentType: "input",
      type: "number",
      placeholder: "Stock Total",
    },
  ];
  
  export const shoppingViewHeaderMenuItems = [
    {
      id: "inicio",
      label: "Home",
      path: "/shop/home",
    },
    {
      id: "products",
      label: "Our Products",
      path: "/shop/listing",
    },
    {
      id: "acercaDe",
      label: "About Us",
      path: "/shop/aboutUs",
    },
    {
      id: "contactanos",
      label: "Contact Us",
      path: "/shop/contact",
    },
    {
      id: "search",
      label: "Search",
      path: "/shop/search",
    },
  ];
  

  //Para que muestre la categoria y la marca debe coincidir categoryOptionsMap con el arreglo categoria igual el brandOptionsMap
  export const categoryOptionsMap = {
    earbuds: "Earbuds",
    earphones: "Earphones",
    watches: "Watches",
    soundbars: "Soundbars",
    headsets: "Headsets",
    speakers: "Speakers",
  };
  
  export const brandOptionsMap = {
    ultima: "Ultima",
    boat: "Boat",
    jbl: "JBL",
    kick: "Kick",
    gravity: "Gravity",
  };
  
  export const filterOptions = {
    category: [
      { id: "earbuds", label: "Earbuds" },
      { id: "earphones", label: "Earphones" },
      { id: "watches", label: "Watches" },
      { id: "soundbars", label: "Soundbars" },
      { id: "headsets", label: "Headsets" },
      { id: "speakers", label: "Speakers" },
    ],
    brand: [
      { id: "ultima", label: "Ultima" },
      { id: "boat", label: "Boat" },
      { id: "jbl", label: "JBL" },
      { id: "kick", label: "Kick" },
      { id: "gravity", label: "Gravity" },
    ],
  };
  
  export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "A to Z" },
    { id: "title-ztoa", label: "Z to A" },
  ];
  
  export const addressFormControls = [
    {
      label: "Address",
      name: "address",
      componentType: "input",
      type: "text",
      placeholder: "Address",
    },
    {
      label: "City",
      name: "city",
      componentType: "input",
      type: "text",
      placeholder: "City",
    },
    {
      label: "Postal Code",
      name: "pincode",
      componentType: "input",
      type: "text",
      placeholder: "Postal Code",
    },
    {
      label: "Telephone",
      name: "phone",
      componentType: "input",
      type: "text",
      placeholder: "Telephone",
    },
    {
      label: "Notes",
      name: "notes",
      componentType: "textarea",
      placeholder: "Additional Notes",
    },
  ];