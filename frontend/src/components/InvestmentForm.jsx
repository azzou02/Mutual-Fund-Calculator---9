import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { investmentService } from '../services/api';

const InvestmentForm = ({ onClose, onSubmit }) => {
    const { getAccessTokenSilently, user } = useAuth0(); // Get user info from Auth0
    const [formData, setFormData] = useState({
        fundTicker: '',
        quantity: '',
        purchaseDate: '',
        purchasePrice: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = await getAccessTokenSilently();

            // Ensure user info is available
            if (!user) {
                console.error("User not found. Make sure you are logged in.");
                return;
            }

            // Include userId in the request payload
            const investmentData = {
                ...formData,
                userId: user.sub // Add userId from Auth0
            };
            
            console.log(formData)
            const result = await investmentService.addInvestment(investmentData, token);
            console.log('Investment added:', result);

            // Reset form after submission
            setFormData({
                fundTicker: '',
                quantity: '',
                purchaseDate: '',
                purchasePrice: ''
            });

            onSubmit(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white p-6 border border-grey-500 rounded-lg max-w-md mx-auto"
        >
            <div className="mb-4">
                <label htmlFor="fundTicker" className="block text font-medium pb-2">Fund Ticker</label>
                <input
                    type="text"
                    id="fundTicker"
                    name="fundTicker"
                    value={formData.fundTicker}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="quantity" className="block text font-medium pb-2">Quantity</label>
                <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="purchaseDate" className="block text font-medium pb-2">Purchase Date</label>
                <input
                    type="date"
                    id="purchaseDate"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="purchasePrice" className="block text font-medium pb-2">Purchase Price</label>
                <input
                    type="number"
                    step="0.01"
                    id="purchasePrice"
                    name="purchasePrice"
                    value={formData.purchasePrice}
                    onChange={handleChange}
                    className="border p-2 w-full rounded"
                    required
                />
            </div>
            <div className="flex justify-between">
                <button
                    type="button"
                    onClick={onClose}
                    className="bg-red-500 text-white px-4 py-2 rounded mr-2 hover:bg-red-600 transition-colors duration-300"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-300"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};

export default InvestmentForm;