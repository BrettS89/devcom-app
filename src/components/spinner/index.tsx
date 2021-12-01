import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import './styles.css';

const Spinner = () => {
  return (
    <div className='customer-spinner'>
      <FontAwesomeIcon icon={faSpinner} size={'3x'} style={{ color: '#f5f5f5' }} />
    </div>
  );
};

export default Spinner;
