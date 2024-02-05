import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
const Submit = styled(Button)(({ theme }) => ({
    color: 'white',
    backgroundColor: 'black',
    height:"39px",
    '&:hover': {
      backgroundColor: '#000000bd',
    },
  }));
export {
    Submit 
}