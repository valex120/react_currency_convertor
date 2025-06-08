
import React from 'react';

const CurrencySelect = ({ currencies, value, onChange, label }) => {
    return (
        <div className="form-group">
            {label && <label>{label}</label>}
            <select className="form-control" value={value} onChange={onChange}>
                {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CurrencySelect;
