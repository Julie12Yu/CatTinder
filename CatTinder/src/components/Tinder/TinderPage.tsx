import './TinderPage.css';
import TinderDeck from './TinderDeck'; // Assuming you have this component
import CatPreference from '../../models/CatPreference';
import { User } from 'firebase/auth';


interface TinderProfileProps {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  preferences: CatPreference;
  failedToRetreive:  () => void;
  viewMatches: () => void;
}
const TinderPage: React.FC<TinderProfileProps> = (props: TinderProfileProps) => {
  return (
    <div>
      <div className="app">
        <TinderDeck authUser={props.authUser} setAuthUser={props.setAuthUser} preferences={props.preferences} failedToRetreive={props.failedToRetreive} viewMatches={props.viewMatches}/>
      </div>
    </div>
  );
};
export default TinderPage;