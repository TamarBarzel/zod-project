import React from 'react';
import { z } from 'zod';
import Form from '@/app/components/Form';

const userSchema = z.object({
  id: z.string().min(8, 'must have at least 8 chars').max(9, 'length must be 9 chars the most').regex(/^\d+$/, "id must contain only numbers"),
  name: z.string().min(2, 'must include at least 2 chars'),
  lastName: z.string().min(2, 'must include at least 2 chars'),
  birthDate: z.date().default(() => new Date()).optional().refine((date) => date && date <= new Date(), { message: 'birthDate cannot be in the future' }),  email: z.string().email(),
});

type User = z.infer<typeof userSchema>;

const Page: React.FC = () => {
  const handleFormSubmit = (data: User) => {
    const result = userSchema.safeParse(data);
    if (!result.success) {
      console.log(result.error.errors);
      return;
    }
    console.log("Data is valid:", result.data);
  };

  return (
    <div>
      <h1>User Form</h1>
      <Form<User> onSubmit={handleFormSubmit} schema={userSchema} />
    </div>
  );
};

export default Page;
