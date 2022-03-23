import { ValidateException } from '@/exceptions/validate.exception';
import { validate } from 'class-validator';

export function Validate() {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const func = descriptor.value;
    descriptor.value = async function () {
      const errors = await validate(this);
      if (errors.length > 0) {
        const messages = new Set();
        for (const error of errors) {
          const message = Object.values(error.constraints).join(',');
          messages.add(message);
        }
        throw new ValidateException(Array.from(messages).join(','));
      }
      return func.call(this);
    };
    return descriptor;
  };
}
