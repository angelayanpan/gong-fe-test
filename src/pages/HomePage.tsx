import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { buildTree } from '../utils/buildTree';
import TreeNode from '../components/TreeNode';

function HomePage() {
    const navigate = useNavigate();
    const { currentUser, allUsers, logout, isAuthenticated } = useAuth();

    console.log(buildTree(allUsers));

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className='home-page'>
            <div className='nav-bar'>
            {currentUser?.firstName} {currentUser?.lastName}
            
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            <div className="tree">
                <h1>Hierarchy Tree</h1>
                {buildTree(allUsers).map((node) => (
                    <TreeNode key={node.id} user={node} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;