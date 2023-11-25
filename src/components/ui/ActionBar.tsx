type ActionBarProps = {
  title?: string;
  children?: React.ReactElement | React.ReactNode;
};

const ActionBar = ({ title, children }: ActionBarProps) => {
  return (
    <div>
      <h5 className='text-xl font-medium tracking-tight text-secondary mb-4 mt-3'>
        {title}
      </h5>
      <div className='flex space-x-2 justify-between items-center my-4  '>
        {children}
      </div>
    </div>
  );
};

export default ActionBar;
