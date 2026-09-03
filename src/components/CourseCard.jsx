function CourseCard({ title, image, progress }) {
  return (
    <div>
      <img src={image} alt={title} />

      <h3>{title}</h3>

      <p>{progress}% completed</p>
    </div>
  );
}

export default CourseCard;