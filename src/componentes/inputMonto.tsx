import React from 'react';

interface InputMontoProps{
    label: string;
    value : number | "",
    onChange: (value : string ) => void;
    placeholder?: string;
}

const InputMonto: React.FC<InputMontoProps> = ({
    label,
    value, 
    onChange,
    placeholder = "0.00"
}) =>{
    return (
        <div className="mb-2">
            <label className= "block text-lg font-bold text-gra-700 mb-2">
                {label}
           </label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-500">
                L.
                </span>
                <input 
                type="number"
                value={value}
                onChange={(e) => onChange (e.target.value)}
                placeholder={placeholder}
                step="0.01"
                min="0"
                className=" w-full pl-10 pr-4 py-4 border-2 border-gray-300 rounded-lg text-2xl font-bold text-center focus:border-blue-blue-500 transition duration-150"
                />
            </div>
        </div>
    );
};

export default InputMonto;