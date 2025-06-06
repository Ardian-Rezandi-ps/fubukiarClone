import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getSelectedArtwork, getSelectedArtworkByIndex } from "../lib/firebase/artwork";
import BackIcon from "../components/BackIcon";
import IconCollection from "/icons/icon-collection.png";
import { useAuth } from "../context/AuthProvider";
import { getCountFromTotal } from "../lib/firebase/scannedImageServices";
import { getUserQuizAttempt } from "../lib/firebase/quiz";
import { sanitizeDOM } from "../lib/sanitizeDOM";
import { getSelecterUserPointByQuizId } from "../lib/firebase/users";
import LoadingScreen from "../components/LoadingScreen";

const DetailImage = ({ isModal, artworkId }) => {
    const [detail, setDetail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [countFromTotal, setCountFromTotal] = useState("");
    const [userQuizAttempt, setUserQuizAttempt] = useState(0);
    const [userPoint, setUserPoint] = useState(0);

    const { id } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const from = searchParams.get("from") ?? "";

    const { user } = useAuth();

    const handleNavigateToQuiz = () => {
        navigate(`/collection/${detail.id}/quiz`);
    };
    /*
    useEffect(() => {
        const fetchData = async () => {
            try {
                const detailData = isModal ? await getSelectedArtwork(artworkId) : await getSelectedArtworkByIndex(id);
                const countData = await getCountFromTotal(user.id);
                const userPointData = detailData && detailData.quiz ? await getSelecterUserPointByQuizId(user.id, detailData?.quiz.id) : 0;
                const attempt = detailData && detailData.quiz ? await getUserQuizAttempt(user.id, detailData?.quiz.id) : null;
                setDetail(detailData);
                setCountFromTotal(countData);
                setUserPoint(userPointData);
                setUserQuizAttempt(attempt);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id, artworkId]);
    if (isLoading) {
        return (
            <LoadingScreen />
        );
    }
    */

    const isAdded = detail && detail.users && detail.users[user.id];
    const isQuizAvailable = detail && detail.quiz;
    const isLimited = userQuizAttempt >= 2 || userPoint === detail.quiz?.totalPoint;
    
    return (
        <div className={`${isModal ? "" : "min-h-screen"} bg-white`}>
            {!isModal && <BackIcon iconColor="white" url={`${from === "scan" ? "/start" : ""}`} className="absolute left-2 top-2 z-20" />}
            <img src={detail.image} alt={detail.title} className={`${isAdded || from === "scan" ? "" : "grayscale blur-md"} w-full h-full`} />
            <div className="relative bg-white border border-white rounded-t-3xl -mt-5 py-6 px-10 z-20">
                {!isAdded && <p className="text-xs font-bold italic pb-2">Karya ini belum ada di koleksimu.</p>}
                <h1 className="text-xl font-bold border-b-4 pb-2">{detail.title}</h1>

                {isAdded || from === "scan" ? (
                    <div className="mt-3">
                        <div className="grid grid-cols-2 text-sm tracking-wide gap-2">
                            {detail.material && (
                                <div>
                                    <p>Material:</p>
                                    <p className="font-bold">{detail.material}</p>
                                </div>
                            )}
                            {detail.year && (
                                <div>
                                    <p>Tahun</p>
                                    <p className="font-bold">{detail.year}</p>
                                </div>
                            )}
                            {detail.media && (
                                <div>
                                    <p>Media:</p>
                                    <p className="font-bold">{detail.media}</p>
                                </div>
                            )}
                            {detail.size && (
                                <div>
                                    <p>Ukuran:</p>
                                    <p className="font-bold">{detail.size}</p>
                                </div>
                            )}
                            {detail.area && (
                                <div className="col-span-2">
                                    <p>Karya ini dapat kamu temukan di area:</p>
                                    <p className="font-bold">{detail.area}</p>
                                </div>
                            )}
                        </div>

                        <div
                            className="text-sm tracking-wide leading-6 mt-3 unreset"
                            dangerouslySetInnerHTML={{ __html: sanitizeDOM(detail.description) }}
                        ></div>
                    </div>
                ) : (
                    <p className="text-sm tracking-wide leading-6 mt-2">
                        Kumpulkan koleksi lainnya untuk membuka informasi tersembunyi dan mainkan kuis seru untuk kesempatan mendapatkan merchandise eksklusif
                        dari Galeri Indonesia Kaya!
                    </p>
                )}

                <div className="mt-8 flex flex-col gap-3">
                    {!isModal && isAdded && (
                        <Link to="/collection" className="w-full text-white bg-primary-darker px-8 py-2 rounded-xl flex gap-4 justify-center">
                            <img src={IconCollection} alt="Icon Collection" />
                            <p className="font-playfair text-nowrap text-sm">Masuk galeri | {countFromTotal}</p>
                        </Link>
                    )}
                    {!isModal && from === "collection" && !isAdded && (
                        <>
                            <Link to="/collection" className="w-full text-white bg-primary-darker px-8 py-2 rounded-xl flex gap-4 justify-center">
                                OK, Mengerti
                            </Link>
                            <Link to="/start" className="w-full text-white bg-primary-darker px-8 py-2 rounded-xl flex gap-4 justify-center">
                                Ke halaman kamera AR
                            </Link>
                        </>
                    )}
                    {!isModal && isQuizAvailable && isAdded && (
                        <button
                            onClick={handleNavigateToQuiz}
                            disabled={isLimited}
                            className="w-full text-white bg-primary-darker disabled:bg-slate-500 px-8 py-2 rounded-xl flex gap-4 justify-center"
                        >
                            <svg width="19" height="20" viewBox="0 0 19 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="path-1-inside-1_727_12112" fill="white">
                                    <path d="M15.8518 2.65908C14.2511 1.02376 12.0323 0.0102158 9.58806 0.0102158C9.54228 0.0102158 9.49649 0.0102158 9.45247 0.0102158C7.08046 0.0461569 4.9233 1.05251 3.35077 2.6483C1.77824 4.24408 0.779766 6.44009 0.732221 8.86073C0.732221 8.92362 0.730469 8.98832 0.730469 9.05121C0.730469 10.8195 1.22882 12.4728 2.09168 13.8655C2.95279 15.2583 4.17666 16.394 5.62768 17.1362C5.73686 17.1901 5.80554 17.3087 5.80378 17.4183V17.4525C5.79145 17.5423 5.78616 17.634 5.78616 17.7256V18.5271C5.76327 18.6565 5.74919 18.7895 5.74919 18.9278V21.3431C5.74919 21.9882 6.00805 22.5759 6.42187 22.9964C6.49935 23.0755 6.58564 23.1473 6.67369 23.2156V23.3845C6.67369 23.9075 6.88324 24.3837 7.21958 24.7252C7.55416 25.0666 8.02082 25.2822 8.53326 25.2822H10.8454C11.3578 25.2822 11.8245 25.0666 12.1591 24.7252C12.4936 24.3837 12.705 23.9075 12.705 23.3845V23.2156C12.793 23.1473 12.8793 23.0773 12.9568 22.9964C13.3706 22.5741 13.6295 21.9864 13.6295 21.3431V18.9278C13.6295 18.838 13.6224 18.7517 13.6136 18.6673V17.7256C13.6136 17.5783 13.5995 17.4327 13.5731 17.2925L13.5696 17.2584C13.5696 17.2242 13.5784 17.1883 13.6013 17.1506C13.6242 17.1146 13.6594 17.0787 13.7034 17.0553C15.1139 16.2987 16.2991 15.1684 17.132 13.7901C17.9649 12.4135 18.4474 10.7872 18.4474 9.04942C18.4474 6.5551 17.4542 4.29081 15.8535 2.65728L15.8518 2.65908ZM16.0455 13.109C15.3323 14.2878 14.3162 15.2582 13.1082 15.9052C12.8634 16.0364 12.6609 16.2305 12.5183 16.4623C12.3757 16.6941 12.2911 16.9708 12.2911 17.2602C12.2911 17.3518 12.2999 17.4453 12.3175 17.5387C12.3281 17.5998 12.3351 17.6609 12.3351 17.7256V18.9045C12.3351 18.9907 12.3017 19.0662 12.2436 19.1273C12.1837 19.1884 12.1097 19.2208 12.0252 19.2208H7.37102C7.28473 19.2208 7.21253 19.1866 7.15266 19.1273C7.09279 19.0662 7.06109 18.9907 7.06109 18.9045V17.7256C7.06109 17.6861 7.06286 17.6465 7.06814 17.6088C7.07518 17.5441 7.07871 17.4812 7.07871 17.4183C7.07871 16.8037 6.73356 16.2466 6.19823 15.9717C4.95499 15.3373 3.90723 14.3633 3.16939 13.1701C2.43155 11.9768 2.0054 10.5679 2.0054 9.05121C2.0054 8.9973 2.0054 8.94159 2.0054 8.88768C2.04766 6.81927 2.8982 4.94494 4.24885 3.57199C5.60126 2.20083 7.44323 1.34363 9.47008 1.31308C9.50883 1.31308 9.54932 1.31308 9.5863 1.31308C11.6818 1.31308 13.5731 2.17747 14.9484 3.57917C16.322 4.98088 17.169 6.91272 17.169 9.05121C17.169 10.541 16.7569 11.9283 16.0437 13.1072L16.0455 13.109ZM11.2539 23.8069C11.1447 23.9165 11.0039 23.9812 10.8436 23.983H8.53149C8.37125 23.983 8.23037 23.9183 8.12119 23.8069C8.08597 23.7709 8.05779 23.7296 8.03314 23.6865C8.03666 23.6865 8.03842 23.6865 8.04194 23.6865H11.3349C11.3349 23.6865 11.3402 23.6865 11.3437 23.6865C11.3191 23.7296 11.2909 23.7709 11.2557 23.8069H11.2539ZM12.0516 22.0799C11.8632 22.2704 11.6132 22.3854 11.3332 22.3854H8.04018C7.76019 22.3854 7.51014 22.2704 7.32172 22.0799C7.13506 21.8876 7.02235 21.6324 7.02235 21.3467V20.4859C7.13505 20.5128 7.24951 20.5272 7.36926 20.5272H12.0235C12.1362 20.5272 12.2453 20.5128 12.3492 20.4895V21.3467C12.3492 21.6324 12.2365 21.8876 12.0499 22.0799H12.0516Z" />
                                    <path d="M11.5779 4.44536C11.0215 4.1722 10.3858 4.03742 9.67435 4.03742C8.90833 4.03742 8.22684 4.19916 7.64045 4.52623C7.06285 4.8479 6.61205 5.26302 6.30564 5.7644C6.001 6.26038 5.84251 6.76176 5.84251 7.26135C5.84251 7.5363 5.9605 7.79507 6.16653 8.00892C6.37784 8.23355 6.65959 8.35216 6.96776 8.35036C7.22838 8.35036 7.46787 8.2677 7.65277 8.10057C7.83767 7.93524 7.96798 7.69803 8.05603 7.40511C8.22156 6.89654 8.4223 6.52096 8.64594 6.28015C8.74808 6.16873 8.88016 6.08427 9.04921 6.02317C9.21826 5.96387 9.42605 5.93152 9.67435 5.93152C10.0882 5.93152 10.4016 6.05193 10.6499 6.28375C10.9 6.52276 11.0162 6.79231 11.018 7.13555C11.018 7.30627 10.9792 7.45722 10.9017 7.60099C10.8172 7.75733 10.7133 7.8975 10.5883 8.0233C10.458 8.15628 10.2396 8.36115 9.93673 8.6307C9.5863 8.94519 9.30631 9.21654 9.095 9.44836C8.87664 9.69097 8.70054 9.97131 8.57022 10.2876C8.43463 10.6129 8.37124 10.992 8.37124 11.4179C8.37124 11.5958 8.39414 11.7594 8.4452 11.9049C8.49451 12.0505 8.57375 12.1799 8.6794 12.2823C8.87839 12.48 9.14078 12.5824 9.42606 12.5806C9.69372 12.5806 9.93144 12.507 10.1111 12.347C10.2889 12.1889 10.3963 11.9589 10.4474 11.6821C10.4985 11.4467 10.539 11.2796 10.5636 11.1933C10.5865 11.1106 10.6182 11.028 10.6622 10.9417C10.701 10.8644 10.7644 10.771 10.856 10.665C10.9475 10.5589 11.0725 10.4314 11.2293 10.284C11.8157 9.74847 12.2225 9.36749 12.4531 9.13747C12.6926 8.89846 12.8986 8.61453 13.0712 8.28926C13.2508 7.94961 13.3389 7.55606 13.3389 7.11938C13.3389 6.56049 13.1839 6.03755 12.8775 5.56313C12.5711 5.08691 12.1344 4.71132 11.5832 4.43996L11.5779 4.44536Z" />
                                    <path d="M9.50178 12.8897C9.1584 12.8897 8.8467 13.0137 8.60721 13.2545C8.36596 13.4935 8.23741 13.808 8.23917 14.1549C8.23917 14.3471 8.26911 14.5233 8.33427 14.6832C8.39766 14.8431 8.49803 14.9833 8.62482 15.0965C8.86959 15.3158 9.17248 15.429 9.50002 15.429C9.82051 15.429 10.1181 15.314 10.3594 15.0929C10.4862 14.9779 10.583 14.8395 10.6464 14.6814C10.7098 14.5233 10.7397 14.3471 10.7397 14.1584C10.7415 13.8116 10.6182 13.4989 10.3805 13.2599C10.1463 13.0191 9.83812 12.8915 9.49826 12.8933L9.50178 12.8897Z" />
                                </mask>
                                <path
                                    d="M15.8518 2.65908C14.2511 1.02376 12.0323 0.0102158 9.58806 0.0102158C9.54228 0.0102158 9.49649 0.0102158 9.45247 0.0102158C7.08046 0.0461569 4.9233 1.05251 3.35077 2.6483C1.77824 4.24408 0.779766 6.44009 0.732221 8.86073C0.732221 8.92362 0.730469 8.98832 0.730469 9.05121C0.730469 10.8195 1.22882 12.4728 2.09168 13.8655C2.95279 15.2583 4.17666 16.394 5.62768 17.1362C5.73686 17.1901 5.80554 17.3087 5.80378 17.4183V17.4525C5.79145 17.5423 5.78616 17.634 5.78616 17.7256V18.5271C5.76327 18.6565 5.74919 18.7895 5.74919 18.9278V21.3431C5.74919 21.9882 6.00805 22.5759 6.42187 22.9964C6.49935 23.0755 6.58564 23.1473 6.67369 23.2156V23.3845C6.67369 23.9075 6.88324 24.3837 7.21958 24.7252C7.55416 25.0666 8.02082 25.2822 8.53326 25.2822H10.8454C11.3578 25.2822 11.8245 25.0666 12.1591 24.7252C12.4936 24.3837 12.705 23.9075 12.705 23.3845V23.2156C12.793 23.1473 12.8793 23.0773 12.9568 22.9964C13.3706 22.5741 13.6295 21.9864 13.6295 21.3431V18.9278C13.6295 18.838 13.6224 18.7517 13.6136 18.6673V17.7256C13.6136 17.5783 13.5995 17.4327 13.5731 17.2925L13.5696 17.2584C13.5696 17.2242 13.5784 17.1883 13.6013 17.1506C13.6242 17.1146 13.6594 17.0787 13.7034 17.0553C15.1139 16.2987 16.2991 15.1684 17.132 13.7901C17.9649 12.4135 18.4474 10.7872 18.4474 9.04942C18.4474 6.5551 17.4542 4.29081 15.8535 2.65728L15.8518 2.65908ZM16.0455 13.109C15.3323 14.2878 14.3162 15.2582 13.1082 15.9052C12.8634 16.0364 12.6609 16.2305 12.5183 16.4623C12.3757 16.6941 12.2911 16.9708 12.2911 17.2602C12.2911 17.3518 12.2999 17.4453 12.3175 17.5387C12.3281 17.5998 12.3351 17.6609 12.3351 17.7256V18.9045C12.3351 18.9907 12.3017 19.0662 12.2436 19.1273C12.1837 19.1884 12.1097 19.2208 12.0252 19.2208H7.37102C7.28473 19.2208 7.21253 19.1866 7.15266 19.1273C7.09279 19.0662 7.06109 18.9907 7.06109 18.9045V17.7256C7.06109 17.6861 7.06286 17.6465 7.06814 17.6088C7.07518 17.5441 7.07871 17.4812 7.07871 17.4183C7.07871 16.8037 6.73356 16.2466 6.19823 15.9717C4.95499 15.3373 3.90723 14.3633 3.16939 13.1701C2.43155 11.9768 2.0054 10.5679 2.0054 9.05121C2.0054 8.9973 2.0054 8.94159 2.0054 8.88768C2.04766 6.81927 2.8982 4.94494 4.24885 3.57199C5.60126 2.20083 7.44323 1.34363 9.47008 1.31308C9.50883 1.31308 9.54932 1.31308 9.5863 1.31308C11.6818 1.31308 13.5731 2.17747 14.9484 3.57917C16.322 4.98088 17.169 6.91272 17.169 9.05121C17.169 10.541 16.7569 11.9283 16.0437 13.1072L16.0455 13.109ZM11.2539 23.8069C11.1447 23.9165 11.0039 23.9812 10.8436 23.983H8.53149C8.37125 23.983 8.23037 23.9183 8.12119 23.8069C8.08597 23.7709 8.05779 23.7296 8.03314 23.6865C8.03666 23.6865 8.03842 23.6865 8.04194 23.6865H11.3349C11.3349 23.6865 11.3402 23.6865 11.3437 23.6865C11.3191 23.7296 11.2909 23.7709 11.2557 23.8069H11.2539ZM12.0516 22.0799C11.8632 22.2704 11.6132 22.3854 11.3332 22.3854H8.04018C7.76019 22.3854 7.51014 22.2704 7.32172 22.0799C7.13506 21.8876 7.02235 21.6324 7.02235 21.3467V20.4859C7.13505 20.5128 7.24951 20.5272 7.36926 20.5272H12.0235C12.1362 20.5272 12.2453 20.5128 12.3492 20.4895V21.3467C12.3492 21.6324 12.2365 21.8876 12.0499 22.0799H12.0516Z"
                                    fill="white"
                                />
                                <path
                                    d="M11.5779 4.44536C11.0215 4.1722 10.3858 4.03742 9.67435 4.03742C8.90833 4.03742 8.22684 4.19916 7.64045 4.52623C7.06285 4.8479 6.61205 5.26302 6.30564 5.7644C6.001 6.26038 5.84251 6.76176 5.84251 7.26135C5.84251 7.5363 5.9605 7.79507 6.16653 8.00892C6.37784 8.23355 6.65959 8.35216 6.96776 8.35036C7.22838 8.35036 7.46787 8.2677 7.65277 8.10057C7.83767 7.93524 7.96798 7.69803 8.05603 7.40511C8.22156 6.89654 8.4223 6.52096 8.64594 6.28015C8.74808 6.16873 8.88016 6.08427 9.04921 6.02317C9.21826 5.96387 9.42605 5.93152 9.67435 5.93152C10.0882 5.93152 10.4016 6.05193 10.6499 6.28375C10.9 6.52276 11.0162 6.79231 11.018 7.13555C11.018 7.30627 10.9792 7.45722 10.9017 7.60099C10.8172 7.75733 10.7133 7.8975 10.5883 8.0233C10.458 8.15628 10.2396 8.36115 9.93673 8.6307C9.5863 8.94519 9.30631 9.21654 9.095 9.44836C8.87664 9.69097 8.70054 9.97131 8.57022 10.2876C8.43463 10.6129 8.37124 10.992 8.37124 11.4179C8.37124 11.5958 8.39414 11.7594 8.4452 11.9049C8.49451 12.0505 8.57375 12.1799 8.6794 12.2823C8.87839 12.48 9.14078 12.5824 9.42606 12.5806C9.69372 12.5806 9.93144 12.507 10.1111 12.347C10.2889 12.1889 10.3963 11.9589 10.4474 11.6821C10.4985 11.4467 10.539 11.2796 10.5636 11.1933C10.5865 11.1106 10.6182 11.028 10.6622 10.9417C10.701 10.8644 10.7644 10.771 10.856 10.665C10.9475 10.5589 11.0725 10.4314 11.2293 10.284C11.8157 9.74847 12.2225 9.36749 12.4531 9.13747C12.6926 8.89846 12.8986 8.61453 13.0712 8.28926C13.2508 7.94961 13.3389 7.55606 13.3389 7.11938C13.3389 6.56049 13.1839 6.03755 12.8775 5.56313C12.5711 5.08691 12.1344 4.71132 11.5832 4.43996L11.5779 4.44536Z"
                                    fill="white"
                                />
                                <path
                                    d="M9.50178 12.8897C9.1584 12.8897 8.8467 13.0137 8.60721 13.2545C8.36596 13.4935 8.23741 13.808 8.23917 14.1549C8.23917 14.3471 8.26911 14.5233 8.33427 14.6832C8.39766 14.8431 8.49803 14.9833 8.62482 15.0965C8.86959 15.3158 9.17248 15.429 9.50002 15.429C9.82051 15.429 10.1181 15.314 10.3594 15.0929C10.4862 14.9779 10.583 14.8395 10.6464 14.6814C10.7098 14.5233 10.7397 14.3471 10.7397 14.1584C10.7415 13.8116 10.6182 13.4989 10.3805 13.2599C10.1463 13.0191 9.83812 12.8915 9.49826 12.8933L9.50178 12.8897Z"
                                    fill="white"
                                />
                            </svg>
                            <span className="font-playfair text-nowrap text-sm">
                                Mainkan kuis | {userPoint} / {detail.quiz?.totalPoint}
                            </span>
                        </button>
                    )}
                    {isModal && (
                        <button
                            type="button"
                            className="w-full text-white bg-primary-darker px-8 py-2 rounded-xl flex gap-4 justify-center"
                            onClick={() => document.getElementById("detailImage").close()}
                        >
                            Kembali ke Kuis
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailImage;
