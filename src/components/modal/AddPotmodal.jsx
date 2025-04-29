import { useState } from "react";
import style from "./Addmodal.module.scss";

function AddPotmodal({ onClose }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedColor, setSelectedColor] = useState("Pink");
  const [isColorDropdownOpen, setIsColorDropdownOpen] = useState(false);

  const colors = [
    "Green",
    "Yellow",
    "Cyan",
    "Navy",
    "Red",
    "Purple",
    "Turquoise",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>
          <h2>Add New Pots</h2>
          <img
            src="./icon-close-modal.svg"
            alt="icon-modal"
            onClick={onClose}
            className={style.closeBtn}
          />
        </div>

        <div className={style.modalDescription}>
          Create a pot to set savings targets. These can help keep you on track
          as you save for special purchases.
        </div>

        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label>Pot Name</label>
            <input
              type="text"
              placeholder="e.g. Rainy Days"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={style.potNameInput}
            />
          </div>

          <div className={style.formGroup}>
            <label>Target</label>
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
              Add Pot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPotmodal;
