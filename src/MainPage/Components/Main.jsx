import Profile from '../../components/Profile';
import PopularPosts from './PopularPosts';
import '../CSS/Main.css';
import Footer from './Footer';
import Header from './Header';
import AboutUs from './AboutUs';


const Main = () => {
  const mockPosts = [
    {
      id: 1,
      content: 'Вітаємо всіх на новій платформі для студентів! Пишіть, діліться і розвивайтесь разом з нами.',
      author: { full_name: 'Олена Дорошенко', username: 'olena_doro' },
      created_at: '2024-12-20T10:00:00Z',
      likes: 15,
      is_liked: true,
    },
    {
      id: 2,
      content: 'Кожен день — це нова можливість для розвитку. Поділіться своїми досягненнями!',
      author: { full_name: 'Дмитро Смирнов', username: 'dmitro_smirnov' },
      created_at: '2024-12-21T14:00:00Z',
      likes: 30,
      is_liked: false,
    },
    {
      id: 3,
      content: 'Секрети продуктивності для студентів: як встигати все і не втратити мотивацію.',
      author: { full_name: 'Ірина Василенко', username: 'irina_vas' },
      created_at: '2024-12-22T18:30:00Z',
      likes: 25,
      is_liked: true,
    },
  ];
    return (
        <div className="Main">
            <Header />
                
                <h1>Вітаємо на нашому сайті!</h1>
                <h3>Тут ви можете знайти цікаві функції.</h3>
                <PopularPosts posts={mockPosts} />
                <AboutUs  />
            <Footer />
        </div>
    );
};

export default Main;
