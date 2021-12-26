import { forwardRef } from 'react';
import Button from '@material-ui/core/Button';

//@ts-ignore
const DatePickerButton = forwardRef(({ value, onClick }, ref) => {
  return (
    //@ts-ignore
    <Button onClick={onClick} ref={ref} color='primary'>
      {value}
    </Button>
  );
});

export default DatePickerButton;
