import React, { useState } from 'react'
import Input from '../Layouts/Input/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setExpense({ ...expense, [key]: value });

  const handleSubmit = () => {
    if (!expense.category || !expense.amount || !expense.date) {
      alert("Please fill all fields before adding.");
      return;
    }
    onAddExpense(expense);
    setExpense({ category: "", amount: "", date: "", icon: "" });
  };

  return (
    <div>
      <EmojiPickerPopup 
        icon= {expense.icon}
        onSelect = {(selectedIcon)=> handleChange("icon", selectedIcon)}
      />
      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Expense Category"
        placeholder="Rent, Shopping, etc"
        type="text"
      />
      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        type="number"
      />
      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={handleSubmit}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
