import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;


public class B1753 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int V = Integer.parseInt(st.nextToken());
        int E = Integer.parseInt(st.nextToken());
        int sPoint = Integer.parseInt(new StringTokenizer(br.readLine()).nextToken())-1;
        HashMap<Integer, Integer>[] edgeInfo = new HashMap[V];
        for (int i=0; i<V; i++){
            edgeInfo[i] = new HashMap<Integer, Integer>();
        }
        for (int i=0; i<E; i++){
            st = new StringTokenizer(br.readLine());
            int[] info = new int[3];
            info[0] = Integer.parseInt(st.nextToken())-1;
            info[1] = Integer.parseInt(st.nextToken())-1;
            info[2] = Integer.parseInt(st.nextToken());
            addInfo(edgeInfo, info);
        }
        int[] lenArr = solution(edgeInfo, sPoint, V);
        for (int i : lenArr){
            if (i == -1){
                System.out.println("INF");
            }
            else{
                System.out.println(i);
            }
        }
    }

    public static void addInfo(HashMap[] edgeInfo, int[] info){
        HashMap<Integer, Integer> map= edgeInfo[info[0]];
        if(!map.containsKey(info[1]) || map.get(info[1]) > info[2])
            map.put(info[1],info[2]);
    }
    //queue.add(V)  V를 큐에 삽입
    //queue.poll() 큐에서 원소하나 추출 큐가 비어있다면 null
    public static int[] solution(HashMap[] edgeInfo, int sPoint, int V){
        int[] lenArr = new int[V];
        for (int i=0; i<V; i++)
            lenArr[i] = -1;
        PriorityQueue<Edge> heap = new PriorityQueue<>(2,
                (Edge e1, Edge e2) -> e1.weight > e2.weight ? 1 : -1);
        heap.add(new Edge(sPoint, 0));
        while (heap.size() > 0){
            Edge next = heap.poll();
            if (lenArr[next.dest] == -1){
                lenArr[next.dest] = next.weight;
                HashMap<Integer, Integer> nextDest = edgeInfo[next.dest];
                for (Map.Entry<Integer, Integer> entry : nextDest.entrySet()){
                    int key = entry.getKey();
                    int value = entry.getValue();
                    heap.add(new Edge(key, value+lenArr[next.dest]));
                }
            }
        }
        return lenArr;
    }

    static class Edge{
        int dest;
        int weight;
        Edge(int dest, int weight){
            this.dest = dest;
            this.weight = weight;
        }
    }

}
