export function useformatdate(dateString) {
    function formatDate(dateString) {
        return new Date(dateString).toLocaleString('id-ID');
    }
    return { formatDate };
}