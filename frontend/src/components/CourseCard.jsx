import React from "react";
import { Link } from "react-router-dom";

export function CourseCard({ course }) {
  const firstSentence = course.description?.split(".")[0] + ".";

  
  const rating = course.rating || 4.5;

  return (
    <Link to={`/${course._id || course.id}`} className="block">
      <div className="bg-slate-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group hover:scale-[1.015]">
        {course.thumbnail && (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-40 w-full object-cover group-hover:opacity-90 transition"
          />
        )}
        <div className="p-4 flex flex-col justify-between h-[220px]">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 line-clamp-2">{course.title}</h3>

            
            <div className="flex items-center gap-1 text-sm text-yellow-400 mb-2">
              <span>⭐</span>
              <span>{rating.toFixed(1)}</span>
              <span className="text-slate-400 text-xs">(120)</span>
            </div>

            <p className="text-slate-400 text-sm mb-3">{firstSentence}</p>
          </div>

          <div className="mt-auto flex justify-between items-center">
            <span className="text-indigo-400 font-semibold text-lg">₹{course.price}</span>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded-md">
              Enroll
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
