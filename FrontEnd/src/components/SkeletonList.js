import SkeletonCard from "./Skeleton/SkeletonCard";
const SkeletonList = ({ arr }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {arr.map((a) => (
        <SkeletonCard key={a} />
      ))}
    </div>
  );
};

export default SkeletonList;
