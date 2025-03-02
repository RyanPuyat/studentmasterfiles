import loading from '../assets/loading/loading.gif';

const Loading = () => {
  return (
    <img
      src={loading}
      alt="loading"
      style={{ width: '100px', margin: 'auto', display: 'block' }}
    />
  );
};

export default Loading;
