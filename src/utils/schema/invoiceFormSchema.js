export const formSchema = {
    invoiceNumber: "",
    dueDate: "",
    billTo: {
      name: "",
      email: "",
      billingAddress: "",
    },
    billFrom: {
      name: "",
      email: "",
      billingAddress: "",
    },
    items: [
      {
        id: "",
        name: "",
        description: "",
        quantity: 0,
        price: 0,
      },
    ],
    currency: "$",
    taxRate: 0,
    discountRate: 0,
    notes: "",
    calculations: {
      subTotal: 0,
      discount: 0,
      tax: 0,
      total: 0,
    },
  };