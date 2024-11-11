// import React from 'react';
// import { ZodSchema, ZodTypeAny, ZodObject, ZodRawShape } from 'zod';

// interface FormProps<T> {
//   onSubmit: (data: T) => void;
//   schema: ZodSchema<T>;
// }

// const Form = <T extends {}>({ onSubmit, schema }: FormProps<T>) => {
//   const defaultValues = schema.parse({});
//   const [formData, setFormData] = React.useState<T>(defaultValues);

//   const handleChange = (key: keyof T, value: any) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData as T);
//   };

//   const isObjectSchema = schema instanceof ZodObject;
//   const fields = isObjectSchema ? (schema as ZodObject<ZodRawShape>).shape : {};

//   const inputTypeMapping = (fieldSchema: ZodTypeAny): string => {
//     const type = fieldSchema._def.type;  // זיהוי סוג השדה
  
//     switch (type) {
//       case 'string': return 'text';
//       case 'number': return 'number';
//       case 'date': return 'date';
//       case 'boolean': return 'checkbox';
//       case 'enum': return 'select';
//       case 'array': return 'array';
//       case 'union': return 'union';
//       case 'literal': return 'literal';
//       default: return 'text';  
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {Object.entries(fields).map(([key, fieldSchema]) => (
//         <div key={key}>
//           <label>{key}</label>
//           <input
//             type={inputTypeMapping(fieldSchema)}
//             name={key}
//             value={formData[key as keyof T] ? String(formData[key as keyof T]) : ""}
//             onChange={(e) => handleChange(key as keyof T, e.target.value)}
//           />
//         </div>
//       ))}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default Form;
