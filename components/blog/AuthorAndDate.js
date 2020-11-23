import DateElem from "../DateElem";

export default function AuthorAndDate({ author, updatedAt }) {
    return (
        <section>
            <div className="animated fadeInUp delay-2s my-2 container-center">
                <img
                    width={80}
                    height={80}
                    src="/img/me.jpg"
                    className="profile-img shadow-elevation"
                />
                <div className="ml-3 delay-2s">
                    <p className="text-small line-height">
                        <strong className="text-purple">Por: </strong>
                        {author}
                    </p>
                    <p className="text-small">
                        <strong className="text-purple">Atualizado em:</strong>
                        <br />
                        <DateElem dateString={updatedAt} />
                    </p>
                </div>
            </div>
            <style jsx>
                {`
                    .line-height {
                        line-height: 5px;
                    }
                    .profile-img {
                        border-radius: 50%;
                    }
                `}
            </style>
        </section>
    );
}
