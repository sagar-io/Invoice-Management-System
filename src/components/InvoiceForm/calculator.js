export const handleCalculateTotal = (formData, setFormData) => {
  let subTotal = formData.items.reduce(
    (a, item) =>
      item.price && item.quantity
        ? a + parseFloat(item.price) * parseInt(item.quantity)
        : a,
    0
  );

  let tax = parseFloat(subTotal * (formData.taxRate / 100));
  let discount = parseFloat(subTotal * (formData.discountRate / 100));
  let total = subTotal + tax - discount;

  setFormData((draft) => {
    draft.calculations.subTotal = subTotal.toFixed(2);
    draft.calculations.discount = discount.toFixed(2);
    draft.calculations.tax = tax.toFixed(2);
    draft.calculations.total = total.toFixed(2);
  });
};
