import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const cards = [
  {
    id: 1,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_19.jpg',
    badge: 'SOLUTION',
    date: 'Featured - 18 Jul 2022',
    title: 'Print, publishing qui visual quis layout mockups.',
  },
//   {
//     id: 2,
//     image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_18.jpg',
//     badge: 'DESIGN',
//     date: '18 Jul 2022',
//     title: 'Designer checklist for every UX/UI project.',
//   },
  {
    id: 3,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_20.jpg',
    badge: 'DEVELOPMENT',
    date: '18 Jul 2022',
    title: 'How to build a complete web application using React and Node.js.',
  },
  {
    id: 4,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_21.jpg',
    badge: 'BUSINESS',
    date: '18 Jul 2022',
    title: 'Make more productive working flow daily.',
  },
  {
    id: 5,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_22.jpg',
    badge: 'BRANDING',
    date: '18 Jul 2022',
    title: 'Quis nostrud exercitation ullamco laboris nisi.',
  },
  {
    id: 6,
    image: 'https://jobi-svelte.vercel.app/assets/images/blog/blog_img_23.jpg',
    badge: 'MARKETING',
    date: '18 Jul 2022',
    title: 'Make Your WordPress dus Journal.',
  },
];

const Blogs = () => {
    const navigate = useNavigate()

     useEffect(() => {
        // Scroll to the top of the page when the component is loaded
        window.scrollTo(0, 0);
      }, []);

  return (
    <section className="pt-20">
      <div className="bg-gray-100 min-h-screen p-8">
        <h1 className="text-4xl text-center mb-10">Blogs</h1>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col"
            >
              <div className="relative">
                <img
                  src={card.image}
                  alt={card.badge}
                  className="w-full h-56"
                />
                <span className="absolute bottom-2 left-2 bg-lime-400 text-black text-xs font-bold px-3 py-1 rounded">
                  {card.badge}
                </span>
              </div>
              <div className="p-4 flex flex-col flex-1">
                <p className="text-sm text-gray-500 mb-2">{card.date}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {card.title}
                </h3>
                <span
                onClick={() => navigate(`/read-blog/${card.title}`)}
                  className="text-sm font-bold text-gray-900 hover:underline mt-auto cursor-pointer"
                >
                  Continue Reading →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
