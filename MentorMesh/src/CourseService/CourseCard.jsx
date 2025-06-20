import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/courses/${course.id}`)}
      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <img
        src={course.thumbnail_url}
        alt={`${course.title} Thumbnail`}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">{course.title}</h3>
        <p className="text-gray-600 mt-2 text-sm">
          {course.description.slice(0, 100)}...
        </p>
        <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
          <span>🎓 Beginner</span>
          <span>📘 20 Lessons</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-blue-600">
            ₹{course.price || "Free"}
          </span>
          <button className="bg-purple-600 text-white px-4 py-1 rounded hover:bg-purple-700 text-sm">
            Enroll Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
