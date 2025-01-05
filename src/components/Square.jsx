export const Square = ({ children, isSelected, uptdateBoard, index }) => {
    const className = `square ${isSelected ? "is-selected" : ""}`;
  
    const handleClick = () => {
      uptdateBoard(index);
    };
  
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    );
  };