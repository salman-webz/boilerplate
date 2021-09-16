const InputField = ({ Icon,defaultClasses, ...rest}) => {
  return (
    <>
      {Icon && (
        <em className="svg-ico">
          <Icon />
        </em>
      )}
      <input {...rest} />
    </>
  );
};

export default InputField;
