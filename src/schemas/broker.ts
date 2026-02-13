import { z } from 'zod';

export const basicInfoSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone must be exactly 10 digits'),
  email: z.string().email('Invalid email format'),
  city: z.string().min(2, 'City is required'),
  experience: z.string().min(1, 'Select your experience'),
});

export const companyInfoSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  gst: z
    .string()
    .regex(/^\d{2}[A-Z]{5}\d{4}[A-Z]\d[Z][A-Z\d]$/, 'Invalid GST format (e.g. 22ABCDE1234F1Z5)'),
  pan: z
    .string()
    .regex(/^[A-Z]{5}\d{4}[A-Z]$/, 'Invalid PAN format (e.g. ABCDE1234F)'),
  address: z.string().min(5, 'Address is required'),
  businessType: z.string().min(1, 'Select business type'),
});

export const documentsSchema = z.object({
  panFile: z.string().min(1, 'PAN document is required'),
  gstFile: z.string().min(1, 'GST document is required'),
  aadhaarFile: z.string().min(1, 'Aadhaar document is required'),
  chequeFile: z.string().min(1, 'Cancelled cheque is required'),
});

export const bankDetailsSchema = z.object({
  accountName: z.string().min(2, 'Account holder name is required'),
  accountNumber: z
    .string()
    .regex(/^\d{9,18}$/, 'Account number must be 9-18 digits'),
  ifsc: z
    .string()
    .regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC format (e.g. SBIN0001234)'),
  upi: z.string().optional().default(''),
});

export const operatingScopeSchema = z.object({
  routes: z.array(z.string()).min(1, 'Select at least one route'),
  truckTypes: z.array(z.string()).min(1, 'Select at least one truck type'),
  loadTypes: z.array(z.string()).min(1, 'Select at least one load type'),
});

export const commissionSchema = z.object({
  commissionType: z.string().min(1, 'Select commission type'),
  commissionPercent: z.coerce
    .number()
    .min(0.5, 'Minimum 0.5%')
    .max(15, 'Maximum 15%'),
});

// Combined full schema for review
export const fullApplicationSchema = basicInfoSchema
  .merge(companyInfoSchema)
  .merge(documentsSchema)
  .merge(bankDetailsSchema)
  .merge(operatingScopeSchema)
  .merge(commissionSchema);

export type BasicInfoForm = z.infer<typeof basicInfoSchema>;
export type CompanyInfoForm = z.infer<typeof companyInfoSchema>;
export type DocumentsForm = z.infer<typeof documentsSchema>;
export type BankDetailsForm = z.infer<typeof bankDetailsSchema>;
export type OperatingScopeForm = z.infer<typeof operatingScopeSchema>;
export type CommissionForm = z.infer<typeof commissionSchema>;
