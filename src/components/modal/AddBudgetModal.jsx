import { useState } from "react";
import style from "./Addmodal.module.scss";

function AddBudgetModal({ onClose }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedColor, setSelectedColor] = useState("Pink");
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const colors = [
    "Green",
    "Yellow",
    "Cyan",
    "Navy",
    "Red",
    "Purple",
    "Turquoise",
  ];
  const categories = [
    "Entertainment",
    "Bills",
    "Groceries",
    "Dining Out",
    "Personal Care",
    "Transportation",
    "Education",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>
          <h2>Add New Budget</h2>
          <img
            src="./icon-close-modal.svg"
            alt="icon-modal"
            onClick={onClose}
            className={style.closeBtn}
          />
        </div>

        <div className={style.modalDescription}>
          Choose a category to set a spending budget. These categories can help
          you monitor spending.
        </div>

        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label>Budget Category</label>
            <div className={style.dropdownContainer}>
              <button
                type="button"
                className={style.dropdownToggle}
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
              >
                {category || "category"}
              </button>
              {isCategoryDropdownOpen && (
                <div className={style.dropdownMenu}>
                  {categories.map((cat) => (
                    <div
                      key={cat}
                      className={style.dropdownItem}
                      onClick={() => {
                        setCategory(cat);
                        setIsCategoryDropdownOpen(false);
                      }}
                    >
                      {cat}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={style.formGroup}>
            <label>Maximum Spend</label>
            <div className={style.amountInput}>
              <input
                type="number"
                placeholder="$ e.g. 2000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div className={style.formGroup}>
            <label>Theme</label>
            <div className={style.dropdownContainer}>
              <button
                type="button"
                className={style.dropdownToggle}
                onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
              >
                <div
                  style={{
                    display: "inline-block",
                    width: "16px",
                    height: "16px",
                    backgroundColor: selectedColor,
                    borderRadius: "50%",
                    marginRight: "8px",
                    verticalAlign: "middle",
                  }}
                />
                {selectedColor}
              </button>
              {isColorDropdownOpen && (
                <div className={style.dropdownMenu}>
                  {colors.map((color) => (
                    <div
                      key={color}
                      className={style.dropdownItem}
                      onClick={() => {
                        setSelectedColor(color);
                        setIsColorDropdownOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          width: "16px",
                          height: "16px",
                          backgroundColor: color,
                          borderRadius: "50%",
                        }}
                      />
                      {color}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={style.modalActions}>
            <button type="submit" className={style.saveBtn}>
              Add Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBudgetModal;
