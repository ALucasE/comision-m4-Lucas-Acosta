export const Card = ({ children }) => {
  return (
    <div className="container-sm mt-5">
      <div className="card text-white bg-secondary mb-3">{children}</div>
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return <div className="card-header">{children}</div>;
};

export const CardBody = ({ children }) => {
  return <div className="card-body">{children}</div>;
};

export const CardFooter = ({ children }) => {
  return <div className="card-footer">{children}</div>;
};

export const CardTitle = ({ children }) => {
  return <h5 className="card-title">{children}</h5>;
};

export const CardSubtitle = ({ children }) => {
  return <h6 className="card-subtitle text-muted">{children}</h6>;
};

export const CardText = ({ children }) => {
  return <p className="card-text">{children}</p>;
};
