import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useParams } from "react-router-dom";

export function CourseDetails() {
  const { id } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [lecturesByChapter, setLecturesByChapter] = useState({});
  const [openChapter, setOpenChapter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
    fetchChaptersAndLectures();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/${id}`, { withCredentials: true });
      setCourseDetail(res.data.data);
    } catch (err) {
      console.error("Error fetching course:", err);
    }
  };

  const fetchChaptersAndLectures = async () => {
    try {
      const chapterRes = await axios.get(`${BASE_URL}/course/${id}`, { withCredentials: true });
      const chapterList = chapterRes.data.data.map(c => c.chapterId);
      setChapters(chapterList);

      const lectureRes = await axios.get(`${BASE_URL}/course/lectures/all/${id}`, { withCredentials: true });
      setLecturesByChapter(lectureRes.data);
    } catch (err) {
      console.error("Error fetching chapters or lectures:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleChapter = (index) => {
    setOpenChapter(prev => (prev === index ? null : index));
  };

  if (isLoading) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex items-center justify-center">
        <div className="text-lg animate-pulse">Loading course...</div>
      </div>
    );
  }

  if (!courseDetail) {
    return <div className="text-white p-10 text-center">Course not found.</div>;
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen px-4 md:px-10 py-12">
      <div className="max-w-6xl mx-auto space-y-14">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-indigo-400 mb-4">{courseDetail.title}</h1>
            <p className="text-slate-300 mb-6 text-lg leading-relaxed">
              {courseDetail.description || "No description available."}
            </p>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-auto">
            <img
              src={courseDetail.thumbnail}
              alt={courseDetail.title}
              className="w-full h-44 object-cover rounded-lg mb-4"
            />
            <div className="text-2xl font-bold text-indigo-400 mb-1">₹{courseDetail.price}</div>
            <div className="text-yellow-400 text-sm mb-4">⭐ 4.8 Rating</div>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md font-semibold mb-4 transition">
              Purchase Now
            </button>
            <h2 className="text-2xl font-semibold text-indigo-300 mb-4">What’s in the course?</h2>
            <ul className="space-y-3 text-slate-300 rounded-xl text-sm">
              <li className="flex items-center gap-2">• Lifetime access with free updates</li>
              <li className="flex items-center gap-2">• Step-by-step, hands-on project guidance</li>
              <li className="flex items-center gap-2">• Expert instructor support</li>
            </ul>
          </div>
        </div>

        

        
        <div>
          <h2 className="text-3xl font-bold text-indigo-300 mb-6">Course Curriculum</h2>
          <div className="space-y-4">
            {chapters.map((chapter, index) => (
              <div key={chapter._id} className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                <button
                  className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-slate-700 transition-all"
                  onClick={() => handleToggleChapter(index)}
                >
                  <span className="text-lg font-medium">{chapter.name || "Untitled Chapter"}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${openChapter === index ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    openChapter === index ? "max-h-[1000px] py-4 px-6" : "max-h-0 overflow-hidden"
                  }`}
                >
                  {(lecturesByChapter[chapter._id] || []).map((lecture, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-md mb-2"
                    >
                      <div className="flex items-center gap-3">
                        <span>•</span>
                        <span>{lecture.title || "Untitled Lecture"}</span>
                      </div>
                      <span className="text-slate-400 text-sm">5:30 mins</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="flex items-center gap-4 border-t border-slate-700 pt-6">
          <img
            src={courseDetail.instructor?.photo || "https://via.placeholder.com/100"}
            alt={courseDetail.instructor?.name || "Instructor"}
            className="w-16 h-16 rounded-full object-cover border-2 border-indigo-500"
          />
          <div>
            <p className="text-lg font-semibold">{courseDetail.instructor?.name || "Instructor Name"}</p>
            <p className="text-slate-400 text-sm">Instructor</p>
          </div>
        </div>
      </div>
    </div>
  );
}
