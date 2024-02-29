export function TwitchCard ({formatUserName,userName,name, isFollowing}){
    console.log(isFollowing);
    return(
        <article className='tw-card'>
            <header className='tw-card-header'>
                <img 
                className='tw-card-image'
                src={`https://unavatar.io/${name}`} alt="Avatar de Python"/>
                <div className='tw-card-info'>
                    <strong>{name}</strong>
                    <span>{formatUserName(userName)}</span>
                </div>
            </header>

            <aside>
                <button className='tw-card-button'>
                    Seguir
                </button>
            </aside>
        </article>
    )
}

