import React, { useEffect, useState } from "react";
import { CourseCard } from "./CourseCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export function Hero() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(BASE_URL + "/", { withCredentials: true })
      .then((res) => setCourses(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-slate-950 text-white min-h-screen px-6 py-16">
      <div className="max-w-7xl mx-auto text-center space-y-8">
        <h1 className="text-5xl sm:text-6xl font-extrabold">
          Learn With <span className="text-indigo-500">Learnify</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto">
          Explore hand-picked courses by industry experts in programming, AI, design, and more.
        </p>

        <input
          type="text"
          placeholder="Search for courses..."
          className="w-full max-w-xl px-5 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="max-w-7xl mx-auto mt-20">
        <h2 className="text-3xl font-semibold mb-6 text-indigo-400 border-b border-slate-700 pb-2">
          Trending Courses
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full text-center text-slate-400 text-lg py-10">
              Loading courses...
            </div>
          ) : courses.length === 0 ? (
            <div className="col-span-full text-center text-slate-500 text-lg py-10">
              No courses found.
            </div>
          ) : (
            courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
