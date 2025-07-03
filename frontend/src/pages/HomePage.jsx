import { Link } from "react-router";
import { LoaderIcon, SquarePen, Trash2 } from "lucide-react";
import Navbar from "../components/Navbar";
import RateLimitedUI from "../components/RateLimitedUi";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import NotesNotFound from "../components/NotesNotFound";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";

function HomePage() {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      setNotes([]);
      try {
        const response = await api.get("/notes");
        setNotes(response.data);
        setIsRateLimited(false);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching notes", error);
        if (error.response.status === 429) setIsRateLimited(true);
        else toast.error("Failed to load notes");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10 text-[#00FF9D]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      {isRateLimited && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {/* {isLoading && (
          <div className="h-80 flex justify-center items-center py-10">
            <span className="loading loading-spinner text-success size-10"></span>
          </div>
        )} */}

        {/* <div className="text-center text-primary py-10">Loading notes...</div> */}
        {notes.length === 0 && !isRateLimited && !isLoading && (
          <NotesNotFound />
        )}

        {notes.length > 0 && !isRateLimited && !isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
