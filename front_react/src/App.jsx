import { TwitchCard } from './TwitchFollowCard'
import './TwitchCard.css'
export function App (){
    const format = (userName) => `@${userName}`
    return(
     <section className='App'>
     <TwitchCard 
        formatUserName={format} 
        isFollowing 
        userName="PythonBest" 
        name="Python" />
     <TwitchCard
        formatUserName={format} 
        isFollowing={false} 
        userName="PHPOld" 
        name="PHP"/>
     <TwitchCard 
        formatUserName={format}
        userName="ReactFront" 
        name="React"/>
     </section>
    )
}