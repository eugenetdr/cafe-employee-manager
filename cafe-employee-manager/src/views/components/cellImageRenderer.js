export default props => {

  const value = props.value ? <img src={props.value} style={{ height:'96px', width:'96px' }}/> : null;

  return (
    <span style={{ display:'flex', justifyContent:'center', height:'100%' }} >
      {value}
    </span>
  );
};
