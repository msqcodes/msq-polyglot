// src/components/ui/Card.jsx

function Card({ children, className = "", hoverable = false, ...rest }) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-surface shadow-sm transition-shadow ${
        hoverable ? "hover:shadow-md" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

function CardHeader({ children, className = "" }) {
  return <div className={`border-b border-slate-100 px-6 py-4 ${className}`}>{children}</div>;
}

function CardTitle({ children, className = "" }) {
  return <h3 className={`text-h3 font-semibold text-slate-900 ${className}`}>{children}</h3>;
}

function CardBody({ children, className = "" }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

function CardFooter({ children, className = "" }) {
  return (
    <div className={`border-t border-slate-100 px-6 py-4 ${className}`}>{children}</div>
  );
}

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;