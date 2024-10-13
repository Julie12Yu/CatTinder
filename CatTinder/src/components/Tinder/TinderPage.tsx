import './TinderPage.css';
import TinderDeck from './TinderDeck'; // Assuming you have this component
import CatPreference from '../../models/CatPreference';


interface TinderProfileProps {
  preferences: CatPreference;
  failedToRetreive:  () => void;
}
const TinderPage: React.FC<TinderProfileProps> = (props: TinderProfileProps) => {
  return (
    <div>
      <div className="app">
        <TinderDeck preferences={props.preferences} failedToRetreive={props.failedToRetreive}/>
      </div>
    </div>
  );
};
export default TinderPage;