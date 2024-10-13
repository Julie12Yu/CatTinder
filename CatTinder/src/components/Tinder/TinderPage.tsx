import './TinderPage.css';
import TinderDeck from './TinderDeck'; // Assuming you have this component
import CatPreference from '../../models/CatPreference';
import { User } from 'firebase/auth';


interface TinderProfileProps {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  preferences: CatPreference;
  failedToRetreive:  () => void;
}
const TinderPage: React.FC<TinderProfileProps> = (props: TinderProfileProps) => {
  return (
    <div>
      <div className="app">
        <TinderDeck authUser={props.authUser} setAuthUser={props.setAuthUser} preferences={props.preferences} failedToRetreive={props.failedToRetreive}/>
      </div>
    </div>
  );
};
export default TinderPage;