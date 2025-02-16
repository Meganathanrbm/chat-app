import "./backgroundDesign.css";

const BackgroundDesign: React.FC = () => {
  return (
    <div className="area bg-[#4e54c8] dark:bg-gray-950">
      <ul className="circles">
        {Array.from({ length: 15 }).map((_, i) => (
          <li key={i}></li>
        ))}
      </ul>
    </div>
  );
};

export default BackgroundDesign;
