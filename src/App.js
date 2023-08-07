// App.css
/* Add your CSS styles here */

// App.js
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import axios from 'axios';

const CardList = ({ profiles, removeProfile }) => (
    <div>
        {profiles.map(profile => (
            <Card key={profile.id} profile={profile} removeProfile={removeProfile} />
        ))}
    </div>
);

class Card extends React.Component {
    state = {
        showDetails: false,
    };

    toggleDetails = () => {
        this.setState(prevState => ({
            showDetails: !prevState.showDetails,
        }));
    };

    render() {
        const { profile, removeProfile } = this.props;
        const { showDetails } = this.state;

        return (
            <div className="github-profile">
                <img src={profile.avatar_url} alt="profile avatar/image" />
                <div className="info">
                    <div className="name">{profile.name}</div>
                    <div className="company">{profile.company}</div>
                    <button onClick={this.toggleDetails}>
                        {showDetails ? 'Hide Details' : 'Show Details'}
                    </button>
                    <button onClick={() => removeProfile(profile.id)}>Remove</button>
                    {showDetails && (
                        <div className="details">
                            <p>{profile.bio}</p>
                            <p>Followers: {profile.followers}</p>
                            {/* Add more details as needed */}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

class Form extends React.Component {
    state = {
        userName: '',
        error: null, // Add error state for invalid input
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
            this.props.onSubmit(resp.data);
            this.setState({ userName: '', error: null }); // Clear error state on success
        } catch (error) {
            if (error.response && error.response.status === 404) {
                this.setState({ error: 'User not found' }); // Set error state for invalid input
            } else {
                this.setState({ error: 'Network error' }); // Set error state for other network problems
            }
        }
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    value={this.state.userName}
                    onChange={event => this.setState({ userName: event.target.value })}
                    placeholder="GitHub username"
                    required
                />
                <button>Add card</button>
                {this.state.error && <div className="error">{this.state.error}</div>}
            </form>
        );
    }
}

class App extends React.Component {
    state = {
        profiles: [],
        networkError: false, // Add network error state
    };

    addNewProfile = async (profileData) => {
        try {
            this.setState({ networkError: false }); // Clear network error state
            this.setState(prevState => ({
                profiles: [...prevState.profiles, profileData],
            }));
        } catch (error) {
            this.setState({ networkError: true }); // Set network error state
        }
    };

    removeProfile = (id) => {
        this.setState(prevState => ({
            profiles: prevState.profiles.filter(profile => profile.id !== id),
        }));
    };

    render() {
        return (
            <div>
                <div className="header">The Github Cards App</div>
                {this.state.networkError && <div className="error">Network error occurred</div>}
                <Form onSubmit={this.addNewProfile} />
                <CardList profiles={this.state.profiles} removeProfile={this.removeProfile} />
            </div>
        );
    }
}

const mountnode = document.getElementById('root');
ReactDOM.render(<App />, mountnode);

export default App;