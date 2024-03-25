import styles from './profile.module.css';
import ProfileNav from '../../components/profile-nav/profile-nav';
import ProfileForm from '../../components/profile-form/profile-form';

function Profile() {
    return (
        <div className={`${styles.root} pt-15`}>
            <ProfileNav />
            <ProfileForm />
        </div>
    );
}

export default Profile;