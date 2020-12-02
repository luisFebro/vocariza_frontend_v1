import DateElem from "../DateElem";
import Img from "../Img";

export default function AuthorAndDate({ author, updatedAt }) {
    return (
        <section>
            <div className="animated fadeInUp delay-2s my-2 container-center">
                <div className="shadow-elevation-shape">
                    <Img
                        width={80}
                        height={80}
                        src="/img/me.jpg"
                        alt="foto de perfil"
                        className="profile-img"
                    />
                </div>
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

                    .img-wrap {
                        position: relative;
                        width: 80px;
                        height: 80px;
                    }
                    :global(.profile-img) {
                        border-radius: 50%;
                    }
                `}
            </style>
        </section>
    );
}
