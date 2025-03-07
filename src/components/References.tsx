import React from "react";

interface ReferencesProps {
  references?: string[];
}

const References: React.FC<ReferencesProps> = ({ references }) => {
  if (!references?.length) return null;

  return (
    <>
      <h4>References</h4>
      {[...references].sort().map((item) => (
        <p key={item}>{item}</p>
      ))}
    </>
  );
};

export default References;
