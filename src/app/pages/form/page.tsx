'use client'
import React, { useState } from 'react';
import { z } from 'zod';

const userSchema = z.object({
  id: z.string()
    .min(8, 'must have at least 8 chars')
    .max(9, 'length must be 9 chars the most')
    .regex(/^\d+$/, "id must contain only numbers"),
  name: z.string().min(2, 'must include at least 2 chars'),
  lastName: z.string().min(2, 'must include at least 2 chars'),
  birthDate: z.date().default(() => new Date()).optional().refine((date) => date && date <= new Date(), { message: 'birthDate cannot be in the future' }),
  email: z.string().email(),
});

type User = z.infer<typeof userSchema>;

const Page: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    id: '',
    name: '',
    lastName: '',
    birthDate: new Date(),
    email: '',
  });

  const [errors, setErrors] = useState<{ [K in keyof User]?: string }>({});

  const handleInputChange = (key: keyof User, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: key === 'birthDate' ? new Date(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = userSchema.safeParse(formData);

    if (!result.success) {
      const validationErrors: { [K in keyof User]?: string } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          validationErrors[err.path[0] as keyof User] = err.message;
        }
      });
      setErrors(validationErrors);
    } else {
      console.log("Data is valid:", result.data);
      setErrors({});
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-gray-100 shadow-lg rounded-lg">
      <h2 className="text-center text-2xl font-semibold mb-6">פרטי לקוח</h2>
      <form onSubmit={handleSubmit} className="flex flex-wrap -mx-2">
        <div className="w-1/2 px-2 mb-4">
          <label className="block font-bold mb-2">ID</label>
          <input
            type="text"
            value={formData.id}
            onChange={(e) => handleInputChange('id', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.id && <p className="text-red-600 text-sm mt-1">{errors.id}</p>}
        </div>

        <div className="w-1/2 px-2 mb-4">
          <label className="block font-bold mb-2">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="w-1/2 px-2 mb-4">
          <label className="block font-bold mb-2">Last Name</label>
          <input
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
        </div>

        <div className="w-1/2 px-2 mb-4">
          <label className="block font-bold mb-2">Birth Date</label>
          <input
            type="date"
            value={formData.birthDate ? formData.birthDate.toISOString().split('T')[0] : ''}
            onChange={(e) => handleInputChange('birthDate', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.birthDate && <p className="text-red-600 text-sm mt-1">{errors.birthDate}</p>}
        </div>

        <div className="w-1/2 px-2 mb-4">
          <label className="block font-bold mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="w-full px-2">
          <button type="submit" className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
